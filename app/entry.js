"use strict";

import "./node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import * as templates from "./app/templates.ts";
document.body.innerHTML = `
<div class="container">
    <h1>App Design By Bootstrap</h1>
    <div class="alerts"></div>
    <div class="mains"></div>
</div>`;

const mainElement = document.body.querySelector(".mains");

mainElement.innerHTML = `
    <div class="alert alert-success">
        <button class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <h1>Welcome!</h1>
        <p>B4 is an application for creating book bundles</p>
    </div>
`;

const alertElement = document.body.querySelector(".alerts");

alertElement.innerHTML = `
    <div class="alert alert-success alert-dismissible fade in " role="alert">
        <button class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <strong>Success!</strong>Bootstrap is working!
    </div>
`;
