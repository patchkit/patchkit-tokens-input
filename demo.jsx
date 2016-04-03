import React from 'react'
import TokensInput from './index'

const suggestOptions = [
  { title: 'Alice', subtitle: 'Alice Allison', value: 1 },
  { title: 'Bob',   subtitle: 'Bob Robertson', value: 2 },
  { title: 'Carla', subtitle: 'Carla Carlson', value: 3 },
  { title: 'Dan',   subtitle: 'Dan Dannison',  value: 4 }
]

export default class TokensInputDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tokens1: [],
      tokens2: [],
      tokens3: []
    }
  }
  render() {
    const onAdd = listKey => t => {
      console.log('add', t)
      // convert to object, if an arbitrary string input
      if (typeof t == 'string')
        t = { title: t, value: t }

      // find and add to list
      var list = this.state[listKey]
      if (list.filter(t2 => t.value == t2.value).length === 0)
        list.push(t)
      this.setState(this.state)
    }
    const onRemove = listKey => t => {
      console.log('remove', t)

      // find and remove form list
      var list = this.state[listKey]
      var i = list.indexOf(t)
      if (i !== -1)
        list.splice(i, 1)
      this.setState(this.state)
    }
    return <div>
      <h1>patchkit-tokens-input</h1>
      <section className="demo-tokens-input">
        <header>&lt;TokensInput label="Users:" placeholder="alice, bob, carla, dan" suggestOptions="..."&gt;</header>
        <div className="content">
          <TokensInput label="Users:" placeholder="alice, bob, carla, dan" suggestOptions={suggestOptions} tokens={this.state.tokens1} onAdd={onAdd('tokens1')} onRemove={onRemove('tokens1')} />
        </div>
      </section>
      <section className="demo-tokens-input-arbitrary">
        <header>&lt;TokensInput allowArbitrary label="Users:" placeholder="alice, bob, carla, dan" suggestOptions="..."&gt;</header>
        <div className="content">
          <TokensInput allowArbitrary label="Users:" placeholder="alice, bob, carla, dan" suggestOptions={suggestOptions} tokens={this.state.tokens2} onAdd={onAdd('tokens2')} onRemove={onRemove('tokens2')} />
        </div>
      </section>
      <section className="demo-tokens-input">
        <header>&lt;TokensInput limit=2 limitErrorMsg="Limit reached" label="Users:" placeholder="alice, bob, carla, dan" suggestOptions="..."&gt;</header>
        <div className="content">
          <TokensInput limit={2} limitErrorMsg="Limit reached" label="Users:" placeholder="alice, bob, carla, dan" suggestOptions={suggestOptions} tokens={this.state.tokens3} onAdd={onAdd('tokens3')} onRemove={onRemove('tokens3')} />
        </div>
      </section>
      <section className="demo-tokens-readonly">
        <header>&lt;TokensInput readOnly label="Users:" tokens="..."&gt;</header>
        <div className="content">
          <TokensInput readOnly label="Users:" tokens={suggestOptions} />
        </div>
      </section>
    </div>
  }
}