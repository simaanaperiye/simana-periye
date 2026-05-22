-- AlterTable: remove Stripe-specific columns from Order
ALTER TABLE "Order" DROP COLUMN IF EXISTS "stripeSessionId";
ALTER TABLE "Order" DROP COLUMN IF EXISTS "stripePaymentId";

-- AlterTable: change default status from 'pending' to 'confirmed'
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'confirmed';
