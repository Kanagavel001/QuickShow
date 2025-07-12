import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";


// API Controller function to get Single User Bookings
export const getUserBookings = async (req, res) => {
    try {
        const user = req.auth().userId;

        const bookings = await Booking.find({user}).populate({
            path: 'show',
            populate: {path: 'movie'}
        }).sort({createdAt : -1});

        res.json({ success: true, bookings });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


// API Controller function to Update Favorite Movie in clerk User Metadata
export const updateFavorite = async (req, res) => {
    try {
        const { movieId } = req.body;
        const {userId} = req.auth();

        const user = await clerkClient.users.getUser(userId);

        if(!user.privateMetadata.favorites){
            user.privateMetadata.favorites = [];
        }

        if(!user.privateMetadata.favorites.includes(movieId)){
            // Add to favorite movie
            user.privateMetadata.favorites.push(movieId);
        }else{
            // remove from favorite movie
            user.privateMetadata.favorites = user.privateMetadata.favorites.filter(item => item !== movieId);
        }

        await clerkClient.users.updateUserMetadata(userId, {privateMetadata: user.privateMetadata});

        res.json({ success: true, message: "Favorite Movie updated" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// API controller function to get favorite movies of a single User
export const getFavorites = async (req, res) => {
    
    try {
        const { userId } = req.auth();
        const user = await clerkClient.users.getUser(userId);
        const favorites = user.privateMetadata.favorites;
        const movies = await Movie.find({_id: {$in: favorites}});
        res.json({ success: true, movies });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

export const isUser = async (req, res) => {
        res.json({ success: true});
}