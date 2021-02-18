# styled-components-mixins

this project is trying to predefined CSS styles, it helps with simple and accurate styling.
Whenever developers start a new project, they write a lot of boilerplate styles.
So, we offer many proven boiler plate styles.

  - **Technology stack**: It rely on [styled-components](https://styled-components.com/).
  - **Status**:  This project is currently under development. 

## Installation

```sh
npm install styled-components-mixins
```

## Usage

### Mixins

```typescript
const RowList = styled.div`
  ${styleMixins(['flexRow'])} // or styleMixins('flexRow')
`

const ListItem = styled.p`
  ${styleMixins(['typo-body1'])}; // or styleMixins('typo-body1')
  color: blue;
`

export const App = (function App() {
  return (
    <RowList>
      <ListItem>is the example.</ListItem>
      <ListItem>just example.</ListItem>
    </RowList>
  )
})
```
