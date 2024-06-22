import express from "express";
import { getProduct } from "./api/product.js";
import Redis from "ioredis";

const app = express();

// Initialize Redis client
const redis = new Redis({
    host: 'redis',  // Redis service hostname in Docker Compose
    port: 6379,     // Default Redis port
    password: 'password'  // Redis password
});

// Event listener for successful Redis connection
redis.on("connect", () => {
    console.log("Redis connected");
});

/**
 * Home route with rate limiting based on client IP address.
 * Limits each IP to 10 requests every 10 seconds.
 */
app.get("/", async (req, res) => {
    // Get client IP address
    const clientIp = req.header["x-forwarded-for"] || req.socket.remoteAddress;
    const key = `${clientIp}:request_count`;  // Key for storing request count in Redis
    console.log(clientIp);

    // Increment request count for the IP address
    const reqCount = await redis.incr(key);
    if (reqCount === 1) {
        // Set expiration for the key on first request
        await redis.expire(key, 10);  // Key expires in 10 seconds
    }

    const timeRemains = await redis.ttl(key);  // Get remaining time to live for the key
    if (reqCount > 10) {
        // If request count exceeds 10, return rate limit error
        return res.status(402).send(`Too many requests. Try again after ${timeRemains} seconds.`);
    }

    // Send response with current request count
    res.send(`<h1>Hello Ji... ${reqCount}  </h1>`);
});

/**
 * Products route that fetches products, caches the result in Redis, 
 * and serves the cached result for subsequent requests.
 */
app.get("/products", async (req, res) => {
    // Check if products are cached in Redis
    let products = await redis.get("products");
    console.log("isExist", products);
    if (products) {
        // If cached, return the cached products
        console.log("Get from cache");
        return res.json({
            products: JSON.parse(products)
        });
    }

    // Fetch products from the database or external API
    products = await getProduct();

    // Cache the products in Redis with an expiration time of 20 seconds
    await redis.setex("products", 20, JSON.stringify(products.products));

    // Return the fetched products
    res.json({
        products
    });
});

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
