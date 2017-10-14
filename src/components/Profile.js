import React from 'react';
import 'tachyons';
import styled from 'styled-components';
import randomName from 'node-random-name';

// A thin line inbetween profile rows
const BorderedArticle = styled.article`
  transition: all 0.15s ease;

  & + & { border: 1px solid #444; border-left: 0; border-right: 0; }
  &:last-child { border-bottom: 0; }

  /* Styling for element with the isClaimed prop */
  ${({isClaimed}) => isClaimed ? `font-size: 20px;` : ``}
`;

/**
  Styled components to stagger animations.

  Could generalise this component by providing style props
    e.g. ${({triggerClass}) => triggerClass} & { max-height: 500px; }
    e.g. ${({index,interval}) => index * interval}

  Could also use React context and avoid the ugly sI++ stuff going on down below.
*/
const StaggeredScript = styled.div`
  overflow: hidden;
  max-height: 0px;
  .js-item-claimed & { max-height: 500px; }
`
const StaggeredP = styled.p`
  transition: none;
  opacity: 0;

  .js-item-claimed & {
    transition: opacity 2s ease;
    transition-delay: ${({index,interval}) => index * 2}s;
    opacity: 1;
  }
`

export default ({profile, verifyProfile, unverifyProfile, claimedId}) => {
  // Bools to determine display data
  let isClaimed = claimedId === profile.id;
  let notClaimed = claimedId !== null && !isClaimed;
  // If this profile is claimed, make up a suitable backstory.
  let birthyear = new Date(new Date() - (1000 * 60 * 60 * 24 * 365.25 * profile.age)).getFullYear()
  // This increments and allows staggered animation with StaggeredP styled component. See above for notes.
  let sI = 0.25;

  return (
  <BorderedArticle
    isClaimed={isClaimed}
    className={'pv2 w-100 '+(notClaimed ? 'o-20' : '')+(isClaimed ? ' js-item-claimed' : '')}
  >
    <div className='flex items-center'>
      {(isClaimed || !notClaimed) && (
        <a
          className={'pa2 pointer ba br2 mr2 '+ (profile.verified ? 'red b--red' : 'light-green b--light-green grow')}
          onClick={evt => isClaimed ? unverifyProfile(profile.id) : verifyProfile(profile.id)}
        >
          { profile.verified ? 'Cancel' : 'Claim'}
        </a>
      )}
  		<div>
        {isClaimed && <span>You are&nbsp;</span>}
        <span className='b'>{profile.name}</span>
        &nbsp;(aged {profile.age})
      </div>
    </div>
    {/* This was more for fun than anything; the Basic Social Network would hate the idea of providing so much information, I realise. */}
    <StaggeredScript>
      <StaggeredP index={sI++}>You were born in {birthyear}, and raised by a loving family.</StaggeredP>
      <StaggeredP index={sI++}>Your dog's name was {randomName({seed: profile.id, first: true})}.</StaggeredP>
      <StaggeredP index={sI++}>Things were going great...</StaggeredP>
      <StaggeredP index={sI++}>... until the incident.</StaggeredP>
      <StaggeredP index={sI++}>Suffice to say, you needed a change.</StaggeredP>
      <StaggeredP index={sI++}>So you packed your bags, just took off.</StaggeredP>
      <StaggeredP index={sI++}>And applied for a job at CognitionX.</StaggeredP>
    </StaggeredScript>
	</BorderedArticle>
  )
}
