import React, { Component } from 'react';
import 'tachyons';
import styled from 'styled-components';

// A thin line inbetween profile rows
const DelimitedArticle = styled.article`
  & + & { border-top: 1px solid #444; }
`;

export default ({profile, verifyProfile}) => (
  <DelimitedArticle className={'pv2 w-100 flex items-center '+ (profile.verified ? 'o-40' : '')}>
    <a
      className={'pa2 pointer ba br2 ' + (profile.verified ? 'moon-gray b--moon-gray' : 'light-green b--light-green grow')}
      onClick={evt => verifyProfile(profile.id)}
    >
      { profile.verified ? 'Claimed' : 'Claim'}
    </a>
		<div className={'pl2 '+ (profile.verified ? 'strike' : '')}>
      <span className='b'>{profile.name}</span>
      &nbsp;(aged {profile.age})</div>
	</DelimitedArticle>
)
