import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  useHistory,
  useLocation,
} from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { Offcanvas, Container, Navbar, Nav, Button } from 'react-bootstrap'
import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import Notes from './pages/notes'

import './styles.css'

const routes = [
  { path: '/', name: 'Home', Component: Home },
  { path: '/notes', name: 'Notes', Component: Notes },
  { path: '/about', name: 'About', Component: About },
  { path: '/contact', name: 'Contact', Component: Contact },
]

function Example() {
  const [show, setShow] = React.useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const changeColor = () => {
    const randomColor = '#' + (((1 << 24) * Math.random()) | 0).toString(16)
    document.documentElement.style.setProperty('--main-bg-color', randomColor)
  }

  const history = useHistory()

  function changeRoute(direction = 'next') {
    const location = useLocation()
    console.log(location.pathname)
    let out = routes.findIndex((val) => val.path == location.pathname)
    // routes
    if (direction == 'next') {
      if (routes.length >= out + 1) history.push(routes[out + 1].path)
      else history.push(routes[0].path)
    } else {
      if (routes.length >= out - 1) history.push(routes[out - 1].path)
      else history.push(routes[routes.length].path)
    }
  }
  onwheel = (event) => {
    if (event.deltaY < 0) {
      changeRoute('next')
    } else {
      changeRoute('back')
    }
  }

  return (
    <>
      <Router>
        <Navbar bg="light">
          <Nav>
            <Button
              variant="primary"
              className="d-lg-none"
              onClick={handleShow}
            >
              Launch
            </Button>
          </Nav>
          <Nav className="mx-auto">
            {routes.map((route) => (
              <Nav.Link
                key={route.path}
                as={NavLink}
                to={route.path}
                activeClassName="active"
                exact
              >
                {route.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar>
        <Container fluid>
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={1000}
                  classNames="page2"
                  unmountOnExit={true}
                  onEnter={() => changeColor()}
                  onExited={() => changeColor()}
                >
                  <div className="page2">
                    <Component />
                  </div>
                </CSSTransition>
              )}
            </Route>
          ))}
        </Container>
      </Router>
      <CSSTransition
        in={show != null}
        timeout={500}
        classNames="canvas"
        unmountOnExit={false}
      >
        <Offcanvas show={show} onHide={handleClose} className="canvas">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Responsive offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <p className="mb-0">
              This is content within an <code>.offcanvas-lg</code>.
            </p>
          </Offcanvas.Body>
        </Offcanvas>
      </CSSTransition>
    </>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<Example />, rootElement)
