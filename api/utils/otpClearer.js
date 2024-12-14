import cron from 'node-cron';
import prisma from "../lib/prisma.js";
const otpClear = ()=>{
cron.schedule('*/2 * * * *', async () => {
    await prisma.otp.deleteMany({
        where: {
            expiresAt: {
                lt: new Date(),
            },
        },
    });
    console.log('Expired OTPs cleaned up.');
});
}

export default otpClear;