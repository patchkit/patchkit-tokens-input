import React from 'react'
import suggestBox from 'suggest-box'
import cls from 'classnames'

class Token extends React.Component {
  render() {
    return <span className="token">
      {this.props.token.title}
      {this.props.readOnly ? '' : <a onClick={() => this.props.onRemove(this.props.token)}><i className="fa fa-remove"/></a>}
    </span>
  }
}

export default class TokensInput extends React.Component {
  static propTypes = {
    suggestOptions: React.PropTypes.array,
    tokens: React.PropTypes.array.isRequired,
    onAdd: React.PropTypes.func,
    
    label: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    limitErrorMsg: React.PropTypes.string,

    className: React.PropTypes.string,
    limit: React.PropTypes.number,
    allowArbitrary: React.PropTypes.bool,
    readOnly: React.PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = { inputText: '' }
  }

  componentDidMount() {
    this.setupSuggest()
  }
  componentDidUpdate() {
    this.setupSuggest()
  }
  setupSuggest() {
    // setup the suggest-box
    const input = this.refs && this.refs.input
    if (!input || input.isSetup)
      return
    input.isSetup = true
    suggestBox(input, { any: this.props.suggestOptions }, { cls: 'token-input-options' })
    input.addEventListener('suggestselect', this.onSuggestSelect.bind(this))
  }

  onChange(e) {
    this.setState({ inputText: e.target.value })
  }

  onSuggestSelect(e) {
    if (this.props.onAdd)
      this.props.onAdd(e.detail)
    this.setState({ inputText: '' })
  }

  onKeyDown(e) {
    if (!this.props.allowArbitrary)
      return
    const v = this.state.inputText.trim()
    if (e.keyCode === 13 && v) {
      this.props.onAdd(v)
      this.setState({ inputText: '' })      
    }
  }

  render() {
    const isAtLimit = (this.props.limit && this.props.tokens.length >= this.props.limit)
    const limitErrorMsg = this.props.limitErrorMsg
    const inputReadOnly = (isAtLimit || this.props.readOnly)
    const inputStyle = (inputReadOnly) ? { display: 'none' } : undefined
    return <div className={cls('tokens-input', this.props.className)}>
      <div>
        {this.props.label} {this.props.tokens.map(t => <Token key={t.value} token={t} onRemove={this.props.onRemove} readOnly={this.props.readOnly} />)}
        <input ref="input" type="text" placeholder={this.props.placeholder} value={this.state.inputText} onChange={this.onChange.bind(this)} onKeyDown={this.onKeyDown.bind(this)} readOnly={inputReadOnly} style={inputStyle} />
      </div>
      { isAtLimit && limitErrorMsg ? <div className="warning">{limitErrorMsg}</div> : '' }
    </div>
  }
}