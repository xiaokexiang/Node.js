import * as Handlebars from "../node_modules/handlebars/dist/handlebars.js";

export const main = Handlebars.compile(`
<div class="container">
    <h1>App Design By Bootstrap</h1>
    <div class="alerts"></div>
    <div class="mains"></div>
</div>`);

export const welcome = Handlebars.compile(`
<div class="alert alert-success">
        <button class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <h1>Welcome!</h1>
        <p>B4 is an application for creating book bundles</p>
</div>`);

export const alert = Handlebars.compile(`
<div class="alert alert-success alert-dismissible fade in " role="alert">
    <button class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    <strong>Success!</strong>Bootstrap is working!
</div>
`);

// 展示全部的data
export const showTable = Handlebars.compile(`
    <div class="panel panel-default>
        <div class="panel-heading>Books</div>
        {{#if datas.length}}
        <table class="table">
            <tr>
                <th>Name</th>
                <th>Organizer</th>
            </tr>
            {{#each datas}}
            <tr>
                <td>
                    <a href="#view/{{id}}"></a>
                </td>
                <td>
                    <button class="btn delete" data-bundle-id="{{id}}">Delete</button>
                </td>
            </tr>
            {{/each}}
        </table>
        {{else}}
        <div class="panel-body">
            <p>None yet!</p>
        </div>
        {{/if}}
    </div>
`);
