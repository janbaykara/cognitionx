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
    if(!this.state.claimedProfile && !this.state.profiles[thisProfileI].verified) {
      this.state.profiles[thisProfileI].verified = true;
      this.setState({
        profiles: this.state.profiles,
        claimedId: id
      })
      // In a real life situation
      console.log(`POST /api/verify/${id}`)
    }
  }

  render() {
    let claimedProfile = this.state.profiles.find(p => p.id === this.state.claimedId)
    return (
      <main className='w-100 w-70-ns w-50-l center pa3'>
        <header>
          <h1>Welcome to Witness Protection</h1>
          <h2>Claim your new identity</h2>
        </header>
        <section>
          {this.state.profiles ? (
            this.state.claimedId === null ? this.state.profiles.map(profile =>
              <Profile key={profile.id} claimedId={this.state.claimedId} profile={profile} verifyProfile={this.verifyProfile} />
            ) : (
              <Profile key={claimedProfile} claimedId={this.state.claimedId} profile={claimedProfile} />
            )
          ) : (
            <div>Loading profiles</div> // This should never appear since state is initialised with fake data
          )}
        </section>
      </main>
    )
  }
}
