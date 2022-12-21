import sharp, { OutputInfo } from 'sharp';

async function resizeImage(imageUrl: string, width: number, height: number): Promise<Buffer | OutputInfo> {
	return await sharp(imageUrl).resize(width, height).toBuffer();
}
  

export default resizeImage;
