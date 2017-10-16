import styled from 'styled-components';

/**
  Styled components to stagger animations.

  Could generalise this component by providing dynamic props to the CSS
    e.g. ${({triggerClass}) => triggerClass} & { max-height: 500px; }
    e.g. ${({index,interval}) => index * interval}

  Could also use React context and avoid the ugly sI++ stuff going on down below.
*/

export const StaggeredBlock = styled.div`
  overflow: hidden;
  max-height: 0px;
  .js-item-claimed & { max-height: 500px; }
`

const Staggered = styled.p`
  transition: none;
  opacity: 0;
  max-height: 0px;
  margin: 0;

  ${({triggerClass}) => triggerClass} & {
    transition: opacity 2s ease, max-height 1s ease, margin 2s ease;
    max-height: 60px;
    opacity: 1;
    margin: 20px 0;
  }
`

// Implemented separately to prevent duplication of Staggered CSS
export const StaggeredP = styled(Staggered)`
  ${({triggerClass}) => triggerClass} & {
    transition-delay: ${({index,interval}) => index * interval}s;
  }
`
