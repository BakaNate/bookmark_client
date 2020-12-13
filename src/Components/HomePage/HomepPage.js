import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { deleteBookmark, getBookmarks } from '../linkApi';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      img: false,
      video: false,
      errLog: false,
    };
  }

  async fetchAllBookmarks() {
    await getBookmarks().then((bm) => {
      if (bm) {
        this.setState({ data: bm });
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async removeBookmark(id) {
    await deleteBookmark(id).then((rs) => {
      if (rs) {
        window.location.reload();
      }
    });
  }

  redirectImg() {
    this.setState({ img: true });
  }

  redirectVideo() {
    this.setState({ video: true });
  }

  // eslint-disable-next-line consistent-return
  renderBookmarks() {
    for (let i = 0; i <= this.state.data.bookmarks.length; i += 1) {
      return (
        <li>{this.state.data.bookmarks}</li>
      );
    }
  }

  render() {
    if (!this.state.data) this.fetchAllBookmarks();
    if (this.state.img) {
      return (
        <Redirect to={{
          pathname: '/img',
          state: { referrer: this.state },
        }}> </Redirect>
      );
    }
    if (this.state.video) {
      return (
        <Redirect to={{
          pathname: '/video',
          state: { referrer: this.state },
        }}> </Redirect>
      );
    }
    return (
      <div className="HomePage">
        <div className="Header">
          <Card bg="secondary" text="white" className="m-5">
            <Card.Header>
              <h1 className="text-center">Welcome!</h1>
            </Card.Header>
            <Card.Body>
              <h2 className="text-center">Here are your Bookmarks ! You can add one by clicking the buttons below</h2>
              <div className='text-center'>
                <Button variant="primary" className="mr-3" onClick={(e) => this.redirectImg(e)}>Add Image</Button>
                <Button variant="info" onClick={(e) => this.redirectVideo(e)}>Add Video</Button>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="ListBookarks">
          <ul style={{ listStyle: 'none' }}>
            {!!this.state.data
            && <ul style={{ listStyle: 'none' }}>
              {this.state.data.bookmarks.map((bookmark, itm) => <li key={itm}>
                  <Card bg="dark" text="light"
                        className="mb-2" style={{ width: '97rem' }}>
                    <Card.Header >
                      <h2>
                        {bookmark.title}
                      </h2>
                    </Card.Header>
                    <Card.Body>
                      <strong>Author:</strong> {bookmark.author}
                      <div>
                        <span className="mr-4">
                          <strong>Height:</strong> {bookmark.height}
                        </span>
                        <span className="mr-4">
                          <strong>Width:</strong> {bookmark.width}
                        </span>
                        {bookmark.duration ? (
                          <span className="mr-4">
                            <strong>Duration:</strong> {bookmark.duration}
                          </span>
                        ) : (<br/>)}
                      </div>
                      <span className="mr-4">
                        <strong>Added on:</strong> {bookmark.date}
                      </span>
                      <div>
                        <strong>Tags: </strong>
                        <ul>
                          {bookmark.tags.map((tag, i) => <li key={i}>{tag}</li>)}
                        </ul>
                      </div>
                    </Card.Body>
                    <Card.Footer>
                      <strong>URL:</strong>
                      <a href={bookmark.url}> {bookmark.url}</a>
                      <Button variant={'danger'} className="float-right" onClick={() => { this.removeBookmark(bookmark._id).then((r) => r); }}>Delete</Button>
                      <Link to={`/bookmark/${bookmark._id}`}>
                        <Button variant={'warning'} className="float-right mr-3">Edit tags</Button>
                      </Link>
                    </Card.Footer>
                  </Card>
                </li>)}
            </ul>
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default HomePage;
