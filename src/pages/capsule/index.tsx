import Capsule, { Environment } from '@usecapsule/web-sdk';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

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
  const [capsuleInstance, setCapsuleInstance] = useState<Capsule | null>(null);

  useEffect(() => {
    import('@usecapsule/web-sdk').then(CapsuleModule => {
      const Capsule = CapsuleModule.default;
      const instance = new Capsule(Environment.BETA, undefined, {
        offloadMPCComputationURL: 'https://partner-mpc-computation.beta.usecapsule.com',
      });
      setCapsuleInstance(instance);
    });
  }, []);

  // Return the component only when capsuleInstance is ready
  if (!capsuleInstance) return <p>Loading...</p>;

  return <DynamicCapsuleButton capsule={capsuleInstance} appName={'Capsule Marketplace'} />;
};


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
