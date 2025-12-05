import CheckoutForm from '@/components/course/checkout-form'

type Props = { params: Promise<{ id: string }> }

export default async function CheckoutPage({ params }: Props) {
  const { id } = await params

  return (
    <div className="container-style mt-12 mb-12">
      <h2>Secure Checkout</h2>
      <CheckoutForm courseId={id} />
    </div>
  )
}
