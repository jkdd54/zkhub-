import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit';

interface ISuccessResult {
  proof: string;
  nullifier_hash: string;
  merkle_root: string;
  verification_level: 'orb' | 'device';
}

const verifyProof = async (proof: ISuccessResult) => {
  console.log('proof', proof);
  const response = await fetch('/api/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...proof, action: "verify" }),
  });

  if (response.ok) {
    const { verified } = await response.json();
    return verified;
  } else {
    const { error } = await response.json();
    throw new Error(error);
  }
};

const onSuccess = () => {
  console.log("Success");
  window.location.href = '/?login=success';
};

export default function Home() {
  return (
    <div className="container-center">
      <h1>Community Site</h1>
      <p>월드 커뮤니티는 세계 최초로 월드 ID만 사용하는 완전 영지식 증명 커뮤니티입니다.</p>
      <IDKitWidget
        app_id="app_6c3821fa0dbede374338de59f453db3b"
        action="verify"
        verification_level={VerificationLevel.Device}
        handleVerify={verifyProof}
        onSuccess={onSuccess}
      >
        {({ open }) => (
          <button onClick={open} className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
            Verify with World ID
          </button>
        )}
      </IDKitWidget>
    </div>
  );
}
