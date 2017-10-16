import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
  Styled components to stagger animations.

	These props will be automatically passed down to StaggeredElement,
	but can be manually overriden on a per-child basis.
	@prop {String} triggered CSS selector to trigger staggered transition on.
	@prop {String} elementBeforeCSS CSS for all children, when trigger == false
	@prop {String} elementAfterCSS CSS for all children, when trigger == true
	@prop {Number} interval (default: 1) (in seconds) interval between <StaggeredElement /> transitions
	@prop {Number} delay (default: 0) (in seconds) initial transition delay

	@demo
		<StaggeredContainer
			triggered={this.props.triggered}
			elementBeforeCSS={`color: red;`}
			elementAfterCSS={`color: green; transition: color 0.3s ease;`}
		>
			<StaggeredElement>Will transition immediately...</StaggeredElement>
			<StaggeredElement>... and this, a second later...</StaggeredElement>
			<StaggeredElement>... and so on...</StaggeredElement>
		</StaggeredContainer>
*/

/**
	Container component
	Passes context through to child animation components
*/
const StaggeredDiv = styled.div`
  ${({triggered, beforeCSS, afterCSS}) => (!triggered ? beforeCSS : afterCSS)}
`;
export class StaggeredContainer extends StaggeredDiv {
	// Send prop data down to children
	getChildContext = () => {
		let i = 0;
		let delay = this.props.delay || 0;
		return {
			elementBeforeCSS: this.props.elementBeforeCSS,
			elementAfterCSS: this.props.elementAfterCSS,
			triggered: this.props.triggered,
			delay: (moreDelay) => delay += (moreDelay || 0),
			interval: this.props.interval || 1,
			index: () => i++
  	}
	}
}
StaggeredContainer.childContextTypes = {
	elementBeforeCSS: PropTypes.string,
	elementAfterCSS: PropTypes.string,
  triggered: PropTypes.bool,
	delay: PropTypes.func,
	interval: PropTypes.number,
	index: PropTypes.func
};

/**
	Child components.
*/
const Staggered = styled.p`
  ${({triggered, beforeCSS, afterCSS}) => (!triggered ? beforeCSS : afterCSS)}
`;
// Implemented separately to prevent duplication of Staggered CSS
const ChildAnimated = styled(Staggered)`
  ${({triggered,index,interval,delay}) => triggered ? `
    transition-delay: ${(index * interval) + delay}s;
  ` : ''}
`
// Higher Order Component populates each new StaggeredElement with the container information
// And automatically registers a new index
// (Can accept per-child props, defaults to container props)
export function StaggeredElement(props,context) {
	return (
		// Render child with parent's props, or override with own props
		<ChildAnimated
			beforeCSS={props.beforeCSS || context.elementBeforeCSS}
			afterCSS={props.afterCSS || context.elementAfterCSS}
			triggered={props.triggered || context.triggered}
			index={props.index || context.index()}
			delay={props.delay ? context.delay(props.delay) : context.delay()} // Aggregates delays
			interval={props.interval || context.interval}
		>{props.children}</ChildAnimated>
	)
}
StaggeredElement.contextTypes = {
	elementBeforeCSS: PropTypes.string,
	elementAfterCSS: PropTypes.string,
  triggered: PropTypes.bool,
	delay: PropTypes.func,
	interval: PropTypes.number,
	index: PropTypes.func
};
