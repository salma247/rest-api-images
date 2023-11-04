import { db } from "../config/firebase";

class Image {
  id: string | null;
  imageUrl: string | null;
  shortUrl: string | null;

  constructor(id: string | null, imageUrl: string | null, shortUrl: string | null) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.shortUrl = shortUrl;
  }

  static async getAllImages(): Promise<Image[]> {
    const snapshot = await db.collection('Images').get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Image[];
  }

  static async getImageById(id: string): Promise<Image> {
    const doc = await db.collection('Images').doc(id).get();
    if (!doc.exists) {
      throw new Error('Image not found');
    }
    return { id: doc.id, ...doc.data() } as Image;
  }

  async save(): Promise<void> {
    const docRef = await db.collection('Images').add({
      imageUrl: this.imageUrl,
      shortUrl: this.shortUrl,
    });
    this.id = docRef.id;
  }

  async update(): Promise<void> {
    if (!this.id) {
      throw new Error('Cannot update image without an ID');
    }
    await db.collection('Images').doc(this.id).update({
      imageUrl: this.imageUrl,
      shortUrl: this.shortUrl,
    });
  }

  async delete(): Promise<void> {
    if (!this.id) {
      throw new Error('Cannot delete image without an ID');
    }
    await db.collection('Images').doc(this.id).delete();
  }
}

export default Image;
