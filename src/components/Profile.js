import React, { Component } from 'react';

export default class Profile extends Component {
  render() {
    return (
      <article>
				<div>{this.props.profile.name}</div>
				<div>{this.props.profile.age}</div>
				<a onClick={evt => this.props.verifyProfile(this.props.profile.id)}>
					{ this.props.profile.verified ? 'Claimed' : 'Claim it'}
				</a>
			</article>
    );
  }
}
