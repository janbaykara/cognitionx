import React from 'react';
import 'tachyons';
import styled from 'styled-components';
import randomName from 'node-random-name';
import { StaggeredContainer, StaggeredElement } from './Staggered'

const shrinkTime = '0.2s';

// A thin line inbetween profile rows
const Bordered = styled.article`
  transition: all ${shrinkTime} ease;

  border: 1px solid #444;
  border-left: 0;
  border-right: 0;
  &:first-child { border-top: 0; }
  &:last-child { border-bottom: 0; }
`;

// Profile transition on selection.
// (Splitting off prop-specific styling dedupes generated CSS considerably)
const BorderedArticle = styled(Bordered)`
  /* Styling for element with the isClaimed prop */
  ${({isClaimed}) => isClaimed ? `
    font-size: 20px;
    border: none;
  ` : ``}
`

export default ({profile, verifyProfile, unverifyProfile, claimedId}) => {
  // Bools to determine display data
  let isClaimed = claimedId === profile.id;
  let notClaimed = claimedId !== null && !isClaimed;
  // If this profile is claimed, make up a suitable backstory.
  let birthyear = new Date(new Date() - (1000 * 60 * 60 * 24 * 365.25 * profile.age)).getFullYear()

  return (
  <BorderedArticle
    isClaimed={isClaimed}
    className={'pv2 w-100 '+(notClaimed ? 'o-10' : '')+(isClaimed ? ' js-item-claimed' : '')}
  >
    <div className='flex items-center'>
        <a
          className={'pointer overflow-hidden '
          + (notClaimed ? 'dn ' : 'pa2 mr2 ba br2 ')
          + (profile.verified ? 'red b--red ' : 'light-green b--light-green grow ')}
          onClick={evt => isClaimed ? unverifyProfile(profile.id) : verifyProfile(profile.id)}
        >
          { profile.verified ? 'Cancel' : 'Claim'}
        </a>
  		<div>
        {isClaimed && <span>You are&nbsp;</span>}
        <span className='b'>{profile.name}</span>
        &nbsp;(aged {profile.age})
      </div>
    </div>
    {/* This was more for fun than anything; the Basic Social Network would hate the idea of providing so much information, I realise. */}
    <StaggeredContainer triggered={isClaimed} interval={2} delay={0.5}>
      <StaggeredElement>You were born in {birthyear}, and raised by a loving family.</StaggeredElement>
      <StaggeredElement>Your dog's name was {randomName({seed: profile.id, first: true})}.</StaggeredElement>
      <StaggeredElement>Things were going great...</StaggeredElement>
      <StaggeredElement delay={1}>... until the incident.</StaggeredElement>
      <StaggeredElement delay={1}t>Suffice to say, you needed a change.</StaggeredElement>
      <StaggeredElement>So you packed your bags, just took off.</StaggeredElement>
      <StaggeredElement>And applied for a job at CognitionX.</StaggeredElement>
    </StaggeredContainer>
	</BorderedArticle>
  )
}
