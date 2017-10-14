import React, { Component } from 'react';
import randomName from 'node-random-name'; // Certainly wouldn't include this in anything for production
import Profile from './components/Profile';
import 'tachyons';

/**
  Construct some fake news data.
  This function iterates through to the desired limit,
  generating a profile object with some random values.
*/
const minAge = 18;
const maxAge = 65;
function* fakeProfileGenerator(maxN) {
  let id = 1;
  while(id <= maxN) {
    id++;
    yield {
      id, // ID for now is the array index
      verified: false,
      name: randomName({ random: Math.random }),
      age: Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge
    }
  }
}

export default class App extends Component {

  // For fake data purposes
  state = {
    profiles: [...fakeProfileGenerator(10)],
    claimedId: null
  }
  // In a real life situation
  componentDidMount() {
    console.log(`GET /api/profiles\nthen(x => this.setState({profiles: x}) )`)
  }

  verifyProfile = (id) => {
    const thisProfileI = this.state.profiles.findIndex(p => p.id === id);
    if(!this.state.claimedId && !this.state.profiles[thisProfileI].verified) {
      let nextState = this.state
      nextState.profiles[thisProfileI].verified = true;
      this.setState({
        profiles: nextState.profiles,
        claimedId: id
      })
      // In a real life situation
      console.log(`POST /api/verify/${id}`)
    }
  }

  unverifyProfile = (id) => {
    const thisProfileI = this.state.profiles.findIndex(p => p.id === id);
    if(this.state.claimedId && this.state.profiles[thisProfileI].verified) {
      let nextState = this.state
      nextState.profiles[thisProfileI].verified = false;
      this.setState({
        profiles: nextState.profiles,
        claimedId: null
      })
      // In a real life situation
      console.log(`POST /api/un_verify/${id}`)
    }
  }

  render() {
    return (
      <main className='w-100 w-70-ns w-50-l center pa3 pt4'>
        <header className={this.state.claimedId ? 'o-20' : ''} style={{transition: 'opacity 0.2s ease'}}>
          <h1>Welcome to Witness Protection</h1>
          <h2>Claim your new identity</h2>
        </header>
        <section>
          {this.state.profiles ? this.state.profiles.map(profile =>
            <Profile key={profile.id} claimedId={this.state.claimedId} profile={profile} verifyProfile={this.verifyProfile} unverifyProfile={this.unverifyProfile} />
          ) : (
            <div>Loading profiles</div> // This should never appear since state is initialised with fake data
          )}
        </section>
      </main>
    )
  }
}
