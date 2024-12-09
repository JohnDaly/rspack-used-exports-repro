import { connect } from 'react-redux';

function SomeComponent() {
  return (
    <div>
      <h1>Application A</h1>
    </div>
  );
}

export const ConnectedComponent = connect(() => {})(SomeComponent);
