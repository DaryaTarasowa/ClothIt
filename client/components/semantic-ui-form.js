import React, { PropTypes } from 'react'
import { Input } from 'semantic-ui-react'

export default function SemanticFormField ({ input, label, meta: { touched, error, warning }, as: As = Input, ...props }) {
  function handleChange (e, { value }) {
    return input.onChange(value)
  }
  return (
    <div>
      <As {...input} value={input.value} {...props} onChange={handleChange} error={touched && error} />
      {touched && (warning && <span>{warning}</span>)}
    </div>
  )
}

SemanticFormField.propTypes = {
  as: PropTypes.any,
  input: PropTypes.any,
  label: PropTypes.any,
  meta: PropTypes.any
}
