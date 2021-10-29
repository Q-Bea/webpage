---
---

const projectRendered = []
{% for project in site.data.projects.entries %}
    projectRendered.push({
        title: `{{project.title }}`, //Have to use backticks because when the template replacement happens, any included quotes will break stuff
        animation: `{% include projects/{{project.subfolder}}/animation.html %}`,
        description: `{% include projects/{{project.subfolder}}/description.html %}`,
        keywords: `{% include projectFeatures.html content=project.keywords %}`
    })
{% endfor %}

let currentProject = 0;

window.addEventListener("load", function () {
    document.getElementById("prevProject").onclick = onPrev
    document.getElementById("prevProject").innerHTML = "Previous"

    document.getElementById("nextProject").onclick = onNext
    document.getElementById("nextProject").innerHTML = "Next"

    if (projectRendered[0].animation !== "") {
        document.getElementById("projectAnimation").classList.remove("hidden")
    }
})

var setInnerHTML = function(elm, html) {
    elm.innerHTML = html;
    Array.from(elm.querySelectorAll("script")).forEach( oldScript => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes)
            .forEach( attr => newScript.setAttribute(attr.name, attr.value) );
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}

function onNext() {
    currentProject++;

    if (projectRendered[currentProject] === undefined) {
        currentProject = 0;
    }

    sharedCycle()
}

function onPrev() {
    currentProject--;

    if (currentProject < 0) {
        currentProject = projectRendered.length - 1;
    }

    sharedCycle()
}

function sharedCycle() {
    fade(function () {
        document.getElementById("projectDescription").innerHTML = projectRendered[currentProject].description;
        document.getElementById("projectTitle").innerHTML = projectRendered[currentProject].title;

        document.getElementById("projectTitle").innerHTML = projectRendered[currentProject].title;
        document.getElementById("projectKeywords").innerHTML = projectRendered[currentProject].keywords;
    
        setInnerHTML(document.getElementById("projectAnimation"), projectRendered[currentProject].animation)
    
        if (document.getElementById("projectAnimation").innerHTML === "") {
            document.getElementById("projectAnimation").classList.add("hidden")
        } else {
            document.getElementById("projectAnimation").classList.remove("hidden")
        }
    
        unfade(null, document.getElementById("projectMeta"), document.getElementById("projectAnimation"))
    }, document.getElementById("projectMeta"), document.getElementById("projectAnimation"))
}

function fade(done, ...elements) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        for (element of elements) {
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        }

        if (op <= 0.1){
            clearInterval(timer);
            // element.style.display = 'none';
            done()
        }

        op -= op * 0.12;
    }, 1);
}

function unfade(done, ...elements) {
    var op = 0.1;  // initial opacity
    // element.style.display = 'block';
    var timer = setInterval(function () {
        for (element of elements) {
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        }

        if (op >= 1){
            clearInterval(timer);
        }

        op += op * 0.12;
    }, 1);
}