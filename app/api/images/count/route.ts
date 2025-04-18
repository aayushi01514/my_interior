
import connectDB from '@/lib/mongoose';
import DesignProject from '@/models/Product';

export async function GET() {
    try {
        await connectDB();

        const projects = await DesignProject.find({}, 'frontimg images variations');

        const totalImages = projects.reduce((acc, project) => {
            const front = project.frontimg ? 1 : 0;
            const gallery = Array.isArray(project.images) ? project.images.length : 0;

            const variationImages = Array.isArray(project.variations)
                ? project.variations.reduce((vAcc: any, variation: any) => {
                    return vAcc + (variation.image ? 1 : 0);
                }, 0)
                : 0;

            return acc + front + gallery + variationImages;
        }, 0);

        return Response.json({ count: totalImages });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
        });
    }
}
