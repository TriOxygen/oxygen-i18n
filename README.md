# oxygen-i18n

Simple i18n on crack. uses string literals to achieve greatness.

## Example

```javascript
import React, { Component } from 'react';
import { addMessages, translate as _l } from 'lib/I18n';

addMessages({
  ['en-US']: {
    'Hello {1}, say hello to {2}.': 'Hello {1}, say hello to {2}.'
  }
});

class CourseCreateForm extends Component {

  render() {
    const name = 'Öz';
    const world = 'earth';
    return <div>{_l`Hello ${name}, say hello to ${world}`}</div>
  }
}
```

## Usage together with babel-plugin-oxygen-i18n

To come


## License

Released under The MIT License.
