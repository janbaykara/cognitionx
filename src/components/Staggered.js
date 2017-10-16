import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
  Styled components to stagger animations.

	These props will be automatically passed down to StaggeredElement,
	but can be manually overriden on a per-child basis.
	@prop {String} triggered CSS selector to trigger staggered transition on.
	@prop {Number} interval (default: 1) (in seconds) interval between <StaggeredElement /> transitions
	@prop {Number} delay (default: 0) (in seconds) initial transition delay

	@demo
		<StaggeredContainer triggered={this.props.triggered}>
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
  overflow: hidden;
  ${({triggered}) => !triggered ?
	// Container initial state
	` max-height: 0px;
	` :
	// Container triggered state
	` max-height: 500px;
	`}
`
export class StaggeredContainer extends StaggeredDiv {
	// Send prop data down to children
	getChildContext = () => {
		let i = 0;
		let delay = this.props.delay || 0;
		return {
			triggered: this.props.triggered,
			delay: (moreDelay) => delay += (moreDelay || 0),
			interval: this.props.interval || 1,
			index: () => i++
  	}
	}
}
StaggeredContainer.childContextTypes = {
  triggered: PropTypes.bool,
	delay: PropTypes.func,
	interval: PropTypes.number,
	index: PropTypes.func
};

/**
	Child components.
*/
const Staggered = styled.p`
  ${({triggered}) => !triggered ?
	// Container initial state
	` transition: none;
	  opacity: 0;
	  max-height: 0px;
	  margin: 0;
  ` :
	// Container triggered state
	` transition: opacity 2s ease, max-height 1s ease, margin 2s ease;
    max-height: 60px;
    opacity: 1;
    margin: 20px 0;
	`}
`
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
			triggered={props.triggered || context.triggered}
			index={props.index || context.index()}
			delay={props.delay ? context.delay(props.delay) : context.delay()} // Aggregates delays
			interval={props.interval || context.interval}
		>{props.children}</ChildAnimated>
	)
}
StaggeredElement.contextTypes = {
  triggered: PropTypes.bool,
	delay: PropTypes.func,
	interval: PropTypes.number,
	index: PropTypes.func
};
