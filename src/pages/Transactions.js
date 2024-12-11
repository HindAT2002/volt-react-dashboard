import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Card } from '@themesberg/react-bootstrap';

// Import the data directly
import commentsData from '../data/transactions';

const CommentCard = ({ comment, author, publishDate, imageUrl }) => (
  <Card className="mb-4">
    <Card.Body>
      <div className="d-flex align-items-center mb-3">
        <img
          src={imageUrl.startsWith('data:image') ? '/path/to/default/avatar.jpg' : imageUrl}
          alt={author}
          className="rounded-circle"
          width="50"
          height="50"
        />
        <div className="ms-3">
          <h6 className="mb-0">{author}</h6>
          <small className="text-muted">{publishDate}</small>
        </div>
      </div>
      <p className="mb-0">{comment}</p>
    </Card.Body>
  </Card>
);

export default () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [displayCount, setDisplayCount] = React.useState(10);

  const filteredComments = commentsData
    .filter(item => 
      item.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, displayCount);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Volt</Breadcrumb.Item>
            <Breadcrumb.Item active>Comments</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Comments</h4>
          <p className="mb-0">Latest financial market analysis and comments.</p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">Share</Button>
            <Button variant="outline-primary" size="sm">Export</Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control 
                type="text" 
                placeholder="Search comments or authors" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                {[10, 20, 30].map(number => (
                  <Dropdown.Item 
                    key={number}
                    className="d-flex fw-bold"
                    onClick={() => setDisplayCount(number)}
                  >
                    {number}
                    {displayCount === number && (
                      <span className="icon icon-small ms-auto">
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                    )}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>

      <div className="comments-container">
        {filteredComments.map((item) => (
          <CommentCard
            key={item.invoiceNumber}
            comment={item.comment}
            author={item.author}
            publishDate={item.publish_date}
            imageUrl={item.image_url}
          />
        ))}
      </div>
    </>
  );
};