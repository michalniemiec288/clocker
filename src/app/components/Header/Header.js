import React, {Component} from 'react'
import {Navbar, Nav, Image} from 'react-bootstrap'
import {Link} from 'react-router'
import clock from '../../assets/logo.png'

class Header extends Component {
  componentWillMount() {
    this.props.fetchUser()
  }
  componentWillUpdate() {
    this.props.fetchUser()
  }
  render () {
		const {currentUser, logoutUser} = this.props
		return (
			<header>
				<Navbar>
					<Navbar.Header>
						<Navbar.Toggle />
						<Navbar.Brand>
							<Link className="link" to='/'>
								<Image src={clock} responsive />
								<h2>Clocker</h2>
							</Link>
						</Navbar.Brand>
					</Navbar.Header>
					<Navbar.Collapse>
						{currentUser && 
							<Nav pullRight>
								<li>
									<Link to="/profile">
										Profile
									</Link>
								</li>
								<li>
									<Link to="/logout"
										onClick={logoutUser}>
										Sign out
									</Link>
								</li>
							</Nav>
						}
					</Navbar.Collapse>
				</Navbar>
			</header>
		)
  }
}

export default Header