import ElementStore from './src/stores/ElementStore';
import React from "react";
import ReactFormGenerator from './src/form';
import { SUBMIT_URL } from './config-local';

export default class Demobar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      previewVisible: false
    }

    ElementStore.listen(this._onChange.bind(this));
  }

  togglePreview() {
    this.setState({
      previewVisible: !this.state.previewVisible
    })
    if (!this.state.previewVisible) {
      document.getElementById('form-builder').style.display = 'none';
      return;
    }
    document.getElementById('form-builder').style.display = 'block';
  }

  _onChange(data) {
    this.setState({
      data: data
    });
  }

  render() {
    const buttonText = !this.state.previewVisible ?
      'Preview Form' :
      'Edit Form';

    return (
      <div className="clearfix" style={{margin:'10px', width:'70%'}}>
        <div style={{ display: 'flex', height: '48px', alignItems: 'flex-end' }}>
          <img src="assets/bp-logo.png" width="53" height="40" style={{ marginRight: '12px' }} /><h4>Blue Prism</h4>
          <button className="btn btn-primary" style={{ marginRight: '10px', height: '36px', marginLeft: 'auto' }} onClick={this.togglePreview.bind(this)}>{buttonText}</button>
        </div>
        {
          this.state.previewVisible &&
            <div style={{ marginTop: '80px' }}>
              <ReactFormGenerator
                action_name="Submit"
                answer_data={{}}
                back_action="/"
                back_name="Back"
                data={this.state.data}
                download_path=""
                form_action={SUBMIT_URL}
                form_method="POST"
                variables={this.props.variables}
              />
            </div>
        }
      </div>
    );
  }

}
