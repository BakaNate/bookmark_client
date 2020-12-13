import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Form,
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { getBookmarkInfo, putNewTags } from '../linkApi';

class EditTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      redirect: false,
      tags: '',
    };
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  redirectHome() {
    this.setState({ redirect: true });
  }

  async editList() {
    const bm = this.state;
    const tagList = bm.tags.split(' ');
    const index = tagList.indexOf(5);
    if (index > -1) {
      tagList.splice(index, 1);
    }
    await putNewTags(this.props.match.params.bm, tagList).then(() => {
      this.setState({ redirect: true });
    });
  }

  async fetchBookmarkInfo() {
    await getBookmarkInfo(this.props.match.params.bm).then((b) => {
      if (b) {
        let str = '';
        this.setState({ data: b });
        for (let i = 0; i !== this.state.data.bookmark.tags.length; i += 1) {
          str = `${str}${this.state.data.bookmark.tags[i]} `;
        }
        this.setState({ tags: str });
      }
    });
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={{
          pathname: '/',
          state: { referrer: this.state },
        }}> </Redirect>
      );
    }
    if (!this.state.data) this.fetchBookmarkInfo();
    return (
      <div>
        {!!this.state.data && <div className="info">
          <Card bg="secondary" text="white" className='m-3'>
            <Card.Header>
              <h1>Edit {this.state.data.bookmark.title} s tags</h1>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="addBookmarkImgTags">
                  <Form.Label>
                    <strong>Here are the tags associated to this bookmark feel free to edit,
                      remove or add new ones</strong>
                  </Form.Label>
                  <Form.Control type="text" value={this.state.tags} onChange={(event) => this.setState({ tags: event.target.value })}/>
                </Form.Group>
                <Button variant="success" className="mt-3" onClick={ (e) => this.editList(e) }>Edit tags</Button>
                <Button variant="danger" className="ml-3 mt-3" onClick={(e) => this.redirectHome(e) }>Cancel</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
        }
      </div>
    );
  }
}

export default EditTags;
