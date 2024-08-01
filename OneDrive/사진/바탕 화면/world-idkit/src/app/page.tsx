import React, { createContext, useState } from 'react';
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit';

const verifyProof = async (proof: any) => {
  const response = await fetch('/api/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...proof, action: 'verify' }),
  });

  if (response.ok) {
    const { verified } = await response.json();
    return verified;
  } else {
    const { code, detail } = await response.json();
    throw new Error(`Error Code ${code}: ${detail}`);
  }
};

const onSuccess = () => {
  console.log('Success');
};

export default function HomePage() {
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
          <button onClick={open}>
            Verify with World ID
          </button>
        )}
      </IDKitWidget>
    </div>
  );
}
