import React, { Component } from 'react';
import 'tachyons';

export default ({profile, verifyProfile}) => (
  <article className={'pv2 bt b--near-white w-100 flex items-center '+ (profile.verified ? 'o-40' : '')}>
    <a
      className={'pa2 pointer ba br2 ' + (profile.verified ? 'black b--moon-gray' : 'green b--light-green grow')}
      onClick={evt => verifyProfile(profile.id)}
    >
      { profile.verified ? 'Claimed' : 'Claim'}
    </a>
		<div className={'pl2 '+ (profile.verified ? 'strike' : '')}>
      <span className='b'>{profile.name}</span>
      &nbsp;(aged {profile.age})</div>
	</article>
)
