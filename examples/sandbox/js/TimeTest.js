define([
  'underscore', 'react', 'react-dom', 'jquery', 'wingspan-forms',
], function (_, React, ReactDOM, $, Forms) {
  'use strict';



  var App = React.createClass({
    getInitialState: function () {
      return {
        time: '23:11:09'
      };
    },
    render: function () {
      return (
        <div>
          <div class="formTitle">KendoTime test</div>

          <FormField fieldInfo={{label: 'timepicker'}} isValid={[true, '']} layout="formField" >
            <KendoTime
              value={this.state.time}
              onChange={_.partial(this.onChange, 'time')} />
          </FormField>
        </div>
      );
    },

    onChange: function (fieldName, fieldValue) {
      var nextState = {};
      nextState[fieldName] = fieldValue;
      this.setState(nextState);
    }
  });


  function entrypoint(rootEl) {
    ReactDOM.render(<App />, rootEl);
  }

  var FormField = Forms.FormField;
  var KendoTime = Forms.KendoTime;

  return {
    entrypoint: entrypoint
  };
});
