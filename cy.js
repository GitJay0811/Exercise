$(function() {
    var cy = cytoscape({
        container: document.getElementById('cy'),
        style: [
            {
                selector: 'node',
                css: {
                    "width":"80px",
                    "height":"50px",
                    "content": "data(name)",
                    "font-size":"12px",
                    "background-color": "#FF8EFF",
                    "text-valign": "center",
                    "fontWeight":"bold"
                }
            },
            {
                selector: "edge",
                css: {
                    "content": "data(name)",
                    "font-size":"16px",
                    "line-color": "#AE00AE",
                    "target-arrow-color": "#AE00AE",
                    "curve-style": "bezier",
                    "control-point-step-size": 40,
                    "target-arrow-shape": "triangle",
                }
              }
        ],
        elements: {
            nodes: [
                { data: { id: 'rootContainer'} },
                { data: { id: 'me',name:'Me',parent: 'rootContainer',virtual: true},position: { x: 300, y: 0 } },
                { data: { id: 'container1', parent: 'rootContainer' }},
                { data: { id: 'container2', parent: 'rootContainer' } },
                { data: { id: 'mother',name:'Mother',parent: 'container1',virtual: true },position: { x: 100, y: 150 } },
                { data: { id: 'father',name:'Father',parent: 'container2',virtual: true},position: { x: 500, y: 150 } },
                { data: { id: 'sister',name:'Sister',parent: 'rootContainer'},position: { x: 300, y: -100 } },
                { data: { id: 'mgrandfather',name:'Grandfather',parent: 'container1'} ,position: { x: 0, y: 300 }},
                { data: { id: 'mgrandmother',name:'Grandmother',parent: 'container1' },position: { x: 200, y: 300 } },
                { data: { id: 'pgrandfather',name:'Grandfather',parent: 'container2' } ,position: { x: 400, y: 300 }},
                { data: { id: 'pgrandmother',name:'Grandmother',parent: 'container2' } ,position: { x: 600, y: 300 }},
                { data: { id: 'aunt',name:'Aunt',parent: 'container1' } ,position: { x: 300, y: 150 }},
                { data: { id: 'uncle',name:'Uncle',parent: 'container1' },position: { x: 100, y: 0 }},
            ],
            edges: [
                { data: { id: 'mo', source: 'me', target: 'mother', name:'??????' } },
                { data: { id: 'fa', source: 'me', target: 'father' , name:'??????'} },
                { data: { id: 'sis', source: 'me', target: 'sister', name:'??????' } },
                { data: { id: 'gf', source: 'mother', target: 'mgrandfather', name:'??????' } },
                { data: { id: 'gm', source: 'mother', target: 'mgrandmother', name:'??????' } },
                { data: { id: 'pgf', source: 'father', target: 'pgrandfather', name:'??????' } },
                { data: { id: 'pgm', source: 'father', target: 'pgrandmother', name:'??????' } },
                { data: { id: 'am', source: 'mother', target: 'aunt', name:'??????' } },
                { data: { id: 'um', source: 'mother', target: 'uncle', name:'??????' } },
                { data: { id: 'ume', source: 'me', target: 'uncle', name:'??????' } },
                { data: { id: 'ame', source: 'me', target: 'aunt', name:'??????' } }
            ]
        },
        layout: {
            name: 'preset',//preset
            directed: true,
            padding: 10,
            fit: true
        }
    });
    cy.$('#umd').position({
        x: 123,
        y: 200
      });
    cy.on('tap', 'node', function () {
        if (this.data('virtual')) {
            var parent = this.parent();
            if (!parent.data('fold')) {
                foldNodes(this);
            } else {
                expandNodes(this);
            }
        }
    });

    function foldNodes(target) {
        var parent = target.parent();
        var children = parent.descendants();
        parent.data('fold', true);
        for (var i = children.length - 1; i >= 0; i--) {
            var current = children[i];
            if (current.data('id') != target.data('id')) {
                if (!current.parent().data().fold) {
                    current.parent().data('fold', true);
                }
                current.hide();
                target.css("background-color","yellow");
            }
        }
    }

    function expandNodes(target) {
        var parent = target.parent();
        var children = parent.descendants();
        parent.data('fold', false);
        for (var i = children.length - 1; i >= 0; i--) {
            var current = children[i];
            if (current.data('id') != target.data('id')) {
                if (current.parent().data().fold) {
                    current.parent().data('fold', false);
                }
                current.show();
                target.css("background-color","#FF8EFF");
                current.css("background-color","#FF8EFF");
            }
        }
    }
});