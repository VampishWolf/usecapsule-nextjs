import { Environment } from '@usecapsule/web-sdk';
import dynamic from 'next/dynamic';

// Dynamically import only the React component
const DynamicCapsuleButton = dynamic(
  () =>
    import('@usecapsule/web-sdk').then(
      (res) => res.Button
    ),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

const CapsuleInstance = () => {
  let capsuleInstance;

  if (typeof window !== 'undefined') {
    const Capsule = require('@usecapsule/web-sdk').default;
    capsuleInstance = new Capsule(Environment.BETA, undefined, {
      offloadMPCComputationURL: 'https://partner-mpc-computation.beta.usecapsule.com',
    });
  }


  return (
    <DynamicCapsuleButton
      capsule={capsuleInstance}
      appName={'Capsule Marketplace'}
    />
  );
}

const CapsulePage = () => {
  return (
    <div>
      <p>capsule</p>
      <div>
        <CapsuleInstance />
      </div>
    </div>
  );
}

export default CapsulePage;