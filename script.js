function ngu() {
  window.open("https://3xiondev.github.io/n-gon-upgraded/", "_self");
}

function collatz() {
  window.open("https://3xiondev.github.io/collatz/", "_self");
}

function ndocs() {
  window.open("https://github.com/3xiondev/n-docs/", "_self");
}

function format() {
  window.open("https://github.com/3xiondev/formattingcode/", "_self");
}

function clicker() {
  window.open("https://github.com/3xiondev/hack.halloween/", "_self");
}

document.addEventListener("DOMContentLoaded", function() {
  const cursor = document.createElement("div");
  cursor.className = "cursor";
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", function(e) {
    const cursorX = e.clientX;
    const cursorY = e.clientY;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";
    })
  document.addEventListener("mousedown", function() {
    cursor.style.width = 10 + "px";
    cursor.style.height = 10 + "px";
  })
  document.addEventListener("mouseup", function() {
    cursor.style.width = 15 + "px";
    cursor.style.height = 15 + "px";
  })

  const cursor2 = document.createElement("div");
  cursor2.className = "cursor2";
  document.body.appendChild(cursor2);

  document.addEventListener("mousemove", function(e) {
    const cursor2X = e.clientX;
    const cursor2Y = e.clientY;

    cursor2.style.left = cursor2X + "px";
    cursor2.style.top = cursor2Y + "px";
    })
  document.addEventListener("mousedown", function() {
    cursor2.style.width = 40 + "px";
    cursor2.style.height = 40 + "px";
  })
  document.addEventListener("mouseup", function() {
    cursor2.style.width = 15 + "px";
    cursor2.style.height = 15 + "px";
  })
  })