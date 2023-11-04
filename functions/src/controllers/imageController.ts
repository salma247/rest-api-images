import { Request, Response } from 'express';
import Image from '../models/ImageModel';
const turl = require('turl');
// import axios from 'axios';

// const shortenUrl = 'https://api.shrtco.de/v2/shorten'; not working

export const getAllImages = async (req: Request, res: Response) => {
  try {
    const images = await Image.getAllImages();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const image = await Image.getImageById(id);
    res.json(image);
  } catch (error) {
    res.status(404).json({ error: 'Image not found' });
  }
}

export const createImage = async (req: Request, res: Response) => {
  try {
    const { imageUrl } = req.body;
    if(!imageUrl || imageUrl === '') { throw new Error('Image URL is required'); }
    const image = new Image(null, imageUrl, null);
    await image.save();
    res.json(image);
  } catch (error: any) {
    res.status(400).json({ error: 'Bad Request', message: error.message });
  }
};

export const updateImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { imageUrl, shortUrl } = req.body;
    if(imageUrl && imageUrl === '') { throw new Error('Image URL is required'); }
    if(shortUrl && shortUrl === '') { throw new Error('Short URL is required'); }
    const image = new Image(id, imageUrl, shortUrl);
    await image.update();
    res.json(image);
  } catch (error: any) {
    res.status(400).json({ error: 'Bad Request', message: error.message });
  }
};

export const deleteImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const image = new Image(id, null, null);
    await image.delete();
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

export const shortenImageLink = async (req: Request, res: Response) => {
  try {
    // const { imageUrl } = req.body;
    // const response = await axios.post(shortenUrl, {
    //   url: imageUrl,
    // });

    // if (response.data.ok) {
    //   const shortUrl = response.data.result.full_short_link;
    //   const image = new Image(null, imageUrl, shortUrl);
    //   await image.save();
    //   res.json(image);
    // } else {
    //   res.status(400).json({ error: 'Failed to shorten image link' });
    // }
    const { imageUrl } = req.body;
    if(!imageUrl || imageUrl === '') { throw new Error('Image URL is required'); }
    const shortUrl = await turl.shorten(imageUrl);
    const image = new Image(null, imageUrl, shortUrl);
    await image.save();
    res.json(image);

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
