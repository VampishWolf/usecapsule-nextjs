import dynamic from 'next/dynamic'

export const capsule = () => {
  const DynamicCapsuleButton = dynamic(
    () =>
      import('@usecapsule/web-sdk/dist/modal/CapsuleModal').then(
        (res) => res.CapsuleButton
      ),
    {
      loading: () => <p>Loading...</p>,
      ssr: false,
    }
  )

  return (
    <div>
      <p>capsule</p>
      <div>
        <DynamicCapsuleInstance DynamicCapsuleButton={DynamicCapsuleButton} />
      </div>
    </div>
  )
}

const DynamicCapsuleInstance = ({
  DynamicCapsuleButton,
}: {
  DynamicCapsuleButton: React.ComponentType<any>
}) => {
  const DynamicCapsule = dynamic(() => import('@usecapsule/web-sdk'), {
    ssr: false,
  })
  // This approach is necessary due to TypeScript's type inference limitations with dynamic imports
  return (
    <DynamicCapsuleButton
      capsule={new DynamicCapsule().Environment.BETA(undefined, {
        offloadMPCComputationURL:
          'https://partner-mpc-computation.beta.usecapsule.com',
      })}
      appName={'Capsule Marketplace'}
    />
  )
}

export default capsule
