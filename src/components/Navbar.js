import React, { useContext } from 'react'

const Navbar = props => {
    return (
        <div>
            <ul id="dropdown1" class="dropdown-content">
                <li><a onClick={props.visualizeDijkstra}>Dijksra's Algorithm</a></li>
                <li class="divider"></li>
                <li><a href="#!">two</a></li>
                <li class="divider"></li>
                <li><a href="#!">three</a></li>
            </ul>
            <nav>
                <div class="nav-wrapper">
                    <a href="#!" class="brand-logo">Pathfinding<span className="primary">Visualizer</span></a>
                    <ul class="left hide-on-med-and-down">
                        <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Choose Algorithm<i class="material-icons right">arrow_drop_down</i></a></li>
                        <li> <a>Generate Maze</a></li>
                        <li> <a>Clear</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
