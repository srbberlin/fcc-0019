(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var res = function () {
  var url = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json';
  return {
    do: function _do(f) {
      d3.json(url, function (error, res) {
        if (error) {
          throw error;
        } else {
          d3.xml('img/svg/symbols.svg').mimeType('image/svg+xml').get(function (error, xml) {
            if (error) {
              throw error;
            }

            document.body.appendChild(xml.documentElement);
            f(res.nodes, res.links);
          });
        }
      });
    }
  };
}();

module.exports = res;

},{}],2:[function(require,module,exports){
"use strict";

var n = document.getElementsByTagName('body')[0];
var width = n.clientWidth - 4,
    height = n.clientHeight - 4;

var data = require('./data');

var alpha = 1.9;
var scale = .03;
data.do(function (dNodes, dLinks) {
  var svg, base, links, nodes, labels, sim;

  var ticked = function ticked() {
    nodes.attr('transform', function (d) {
      return "translate(".concat(d.x - 8, ",").concat(d.y - 6, ") scale(").concat(scale, ")");
    });
    labels.attr('x', function (d) {
      return d.x;
    }).attr('y', function (d) {
      return d.y - 12;
    });
    links.attr('x1', function (d) {
      return d.source.x;
    }).attr('y1', function (d) {
      return d.source.y;
    }).attr('x2', function (d) {
      return d.target.x;
    }).attr('y2', function (d) {
      return d.target.y;
    });
  };

  sim = d3.forceSimulation(dNodes).force('link', d3.forceLink(dLinks).distance(60)).force('charge', d3.forceManyBody().strength(-100).distanceMax(500)).force('collide', d3.forceCollide().radius(12).strength(12)).force('x', d3.forceX().strength(.05)).force('y', d3.forceY().strength(.1)).on('tick', ticked);

  var dragstarted = function dragstarted(d) {
    if (!d3.event.active) {
      sim.alphaTarget(alpha).restart();
    }

    d.fx = d.x;
    d.fy = d.y;
  };

  var dragged = function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  };

  var dragended = function dragended(d) {
    if (!d3.event.active) {
      sim.alphaTarget(alpha);
    }

    d.fx = null;
    d.fy = null;
  };

  function over(d) {
    d3.select("#code_".concat(d.code)).attr('display', null);
  }

  function out(d) {
    d3.select("#code_".concat(d.code)).attr('display', 'none');
  }

  svg = d3.select('body').append('svg').attr('width', width).attr('height', height).attr('text-anchor', 'middle').style('font-family', 'sans-serif');
  svg.append('text').attr('transform', "translate(".concat(width / 2, ",").concat(height / 10, ")")).attr('font-size', 34).attr('font-weight', 'bold').text('National Contiguity with a Force Directed Graph');
  base = svg.append('g').attr('transform', "translate(".concat(width / 2, ",").concat(height / 2, ")"));
  links = base.append('g').attr('stroke', '#000').attr('stroke-width', 1.5).selectAll('line').data(dLinks).enter().append('line');
  nodes = base.append('g').selectAll('use').data(dNodes).enter().append('use').attr('href', function (d) {
    return "#".concat(d.code);
  }).attr('class', function (d) {
    return "flag flag-".concat(d.code);
  }).on('mouseover', over).on('mouseout', out).call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended));
  labels = base.append('g').attr('class', 'labels').attr('stroke', 'red').style('font-size', '20px').selectAll('text').data(dNodes).enter().append('text').attr('id', function (d) {
    return "code_".concat(d.code);
  }).attr('display', 'none').text(function (d) {
    return d.country;
  });
});

},{"./data":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZGF0YS5qcyIsInNyYy9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxHQUFHLEdBQUksWUFBTTtBQUNmLE1BQUksR0FBRyxHQUFHLGdGQUFWO0FBRUEsU0FBTztBQUNMLElBQUEsRUFBRSxFQUFFLGFBQUMsQ0FBRCxFQUFPO0FBQ1QsTUFBQSxFQUFFLENBQUMsSUFBSCxDQUFRLEdBQVIsRUFBYSxVQUFDLEtBQUQsRUFBUSxHQUFSLEVBQWdCO0FBQzNCLFlBQUksS0FBSixFQUFXO0FBQ1QsZ0JBQU0sS0FBTjtBQUNELFNBRkQsTUFHSztBQUNILFVBQUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxxQkFBUCxFQUNHLFFBREgsQ0FDWSxlQURaLEVBRUcsR0FGSCxDQUVPLFVBQVMsS0FBVCxFQUFnQixHQUFoQixFQUFxQjtBQUN4QixnQkFBSSxLQUFKLEVBQVc7QUFDVCxvQkFBTSxLQUFOO0FBQ0Q7O0FBQ0QsWUFBQSxRQUFRLENBQUMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsR0FBRyxDQUFDLGVBQTlCO0FBQ0EsWUFBQSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUwsRUFBWSxHQUFHLENBQUMsS0FBaEIsQ0FBRDtBQUNELFdBUkg7QUFTRDtBQUNGLE9BZkQ7QUFpQkQ7QUFuQkksR0FBUDtBQXFCRCxDQXhCUyxFQUFWOztBQTBCQSxNQUFNLENBQUMsT0FBUCxHQUFpQixHQUFqQjs7Ozs7QUMxQkEsSUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLENBQVY7QUFDQSxJQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsV0FBRixHQUFnQixDQUE5QjtBQUFBLElBQWlDLE1BQU0sR0FBRyxDQUFDLENBQUMsWUFBRixHQUFpQixDQUEzRDs7QUFDQSxJQUFNLElBQUksR0FBRyxPQUFPLENB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ekIsR0FLTixNQUxNLENBS0MsTUFMRCxFQU1OLElBTk0sQ0FNRCxJQU5DLEVBTUssVUFBQSxDQUFDO0FBQUEsMEJBQVksQ0FBQyxDQUFDLElBQWQ7QUFBQSxHQU5OLEVBT04sSUFQTSxDQU9ELFNBUEMsRUFPVSxNQVBWLEVBUU4sSUFSTSxDQVFELFVBQUEsQ0FBQztBQUFBLFdBQUksQ0FBQyxDQUFDLE9BQU47QUFBQSxHQVJBLENBQVQ7QUFTRCxDQXZHRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImxldCByZXMgPSAoKCkgPT4ge1xuICBsZXQgdXJsID0gJ2h0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9EZWFsUGV0ZS9mb3JjZURpcmVjdGVkL21hc3Rlci9jb3VudHJpZXMuanNvbidcbiAgXG4gIHJldHVybiB7XG4gICAgZG86IChmKSA9PiB7XG4gICAgICBkMy5qc29uKHVybCwgKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgdGhyb3cgZXJyb3JcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkMy54bWwoJ2ltZy9zdmcvc3ltYm9scy5zdmcnKVxuICAgICAgICAgICAgLm1pbWVUeXBlKCdpbWFnZS9zdmcreG1sJylcbiAgICAgICAgICAgIC5nZXQoZnVuY3Rpb24oZXJyb3IsIHhtbCkge1xuICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvclxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoeG1sLmRvY3VtZW50RWxlbWVudClcbiAgICAgICAgICAgICAgZihyZXMubm9kZXMsIHJlcy5saW5rcylcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBcbiAgICB9LFxuICB9XG59KSgpXG5cbm1vZHVsZS5leHBvcnRzID0gcmVzXG4iLCJjb25zdCBuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXVxuY29uc3Qgd2lkdGggPSBuLmNsaWVudFdpZHRoIC0gNCwgaGVpZ2h0ID0gbi5jbGllbnRIZWlnaHQgLSA0XG5jb25zdCBkYXRhID0gcmVxdWlyZSgnLi9kYXRhJylcbmNvbnN0IGFscGhhID0gMS45XG5jb25zdCBzY2FsZSA9IC4wM1xuXG5kYXRhLmRvKChkTm9kZXMsIGRMaW5rcykgPT4ge1xuICBsZXQgc3ZnLCBiYXNlLCBsaW5rcywgbm9kZXMsIGxhYmVscywgc2ltXG5cbiAgbGV0IHRpY2tlZCA9ICgpID0+IHtcbiAgICBub2Rlc1xuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGQgPT4gYHRyYW5zbGF0ZSgke2QueCAtIDh9LCR7ZC55IC0gNn0pIHNjYWxlKCR7c2NhbGV9KWApXG5cbiAgICBsYWJlbHNcbiAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQueCB9KVxuICAgICAgLmF0dHIoJ3knLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC55IC0gMTIgfSlcblxuICAgIGxpbmtzXG4gICAgICAuYXR0cigneDEnLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC5zb3VyY2UueCB9KVxuICAgICAgLmF0dHIoJ3kxJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQuc291cmNlLnkgfSlcbiAgICAgIC5hdHRyKCd4MicsIGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLnRhcmdldC54IH0pXG4gICAgICAuYXR0cigneTInLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC50YXJnZXQueSB9KVxuICB9XG5cbiAgc2ltID0gZDMuZm9yY2VTaW11bGF0aW9uKGROb2RlcylcbiAgICAuZm9yY2UoJ2xpbmsnLCBkMy5mb3JjZUxpbmsoZExpbmtzKS5kaXN0YW5jZSg2MCkpXG4gICAgLmZvcmNlKCdjaGFyZ2UnLCBkMy5mb3JjZU1hbnlCb2R5KCkuc3RyZW5ndGgoLTEwMCkuZGlzdGFuY2VNYXgoNTAwKSlcbiAgICAuZm9yY2UoJ2NvbGxpZGUnLCBkMy5mb3JjZUNvbGxpZGUoKS5yYWRpdXMoMTIpLnN0cmVuZ3RoKDEyKSlcblxuICAgIC5mb3JjZSgneCcsIGQzLmZvcmNlWCgpLnN0cmVuZ3RoKC4wNSkpXG4gICAgLmZvcmNlKCd5JywgZDMuZm9yY2VZKCkuc3RyZW5ndGgoLjEpKVxuXG4gICAgLm9uKCd0aWNrJywgdGlja2VkKVxuXG4gIGxldCBkcmFnc3RhcnRlZCA9IChkKSA9PiB7XG4gICAgaWYgKCFkMy5ldmVudC5hY3RpdmUpIHtcbiAgICAgIHNpbS5hbHBoYVRhcmdldChhbHBoYSkucmVzdGFydCgpXG4gICAgfVxuICAgIGQuZnggPSBkLnhcbiAgICBkLmZ5ID0gZC55XG4gIH1cblxuICBsZXQgZHJhZ2dlZCA9IChkKSA9PiB7XG4gICAgZC5meCA9IGQzLmV2ZW50LnhcbiAgICBkLmZ5ID0gZDMuZXZlbnQueVxuICB9XG5cbiAgbGV0IGRyYWdlbmRlZCA9IChkKSA9PiAge1xuICAgIGlmICghZDMuZXZlbnQuYWN0aXZlKSAge1xuICAgICAgc2ltLmFscGhhVGFyZ2V0KGFscGhhKVxuICAgIH1cbiAgICBkLmZ4ID0gbnVsbFxuICAgIGQuZnkgPSBudWxsXG4gIH1cblxuICBmdW5jdGlvbiBvdmVyIChkKSB7XG4gICAgZDMuc2VsZWN0KGAjY29kZV8ke2QuY29kZX1gKVxuICAgICAgLmF0dHIoJ2Rpc3BsYXknLCBudWxsKVxuICB9XG5cbiAgZnVuY3Rpb24gb3V0IChkKSB7XG4gICAgZDMuc2VsZWN0KGAjY29kZV8ke2QuY29kZX1gKVxuICAgICAgLmF0dHIoJ2Rpc3BsYXknLCAnbm9uZScpXG4gIH1cblxuICBzdmcgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgLmF0dHIoJ3dpZHRoJywgd2lkdGgpXG4gICAgLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcbiAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAuc3R5bGUoJ2ZvbnQtZmFtaWx5JywgJ3NhbnMtc2VyaWYnKVxuXG4gIHN2Zy5hcHBlbmQoJ3RleHQnKVxuICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7d2lkdGgvMn0sJHtoZWlnaHQvMTB9KWApXG4gICAgLmF0dHIoJ2ZvbnQtc2l6ZScsIDM0KVxuICAgIC5hdHRyKCdmb250LXdlaWdodCcsICdib2xkJylcbiAgICAudGV4dCgnTmF0aW9uYWwgQ29udGlndWl0eSB3aXRoIGEgRm9yY2UgRGlyZWN0ZWQgR3JhcGgnKVxuXG4gIGJhc2UgPSBzdmcuYXBwZW5kKCdnJylcbiAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke3dpZHRoLzJ9LCR7aGVpZ2h0LzJ9KWApXG5cbiAgbGlua3MgPSBiYXNlLmFwcGVuZCgnZycpXG4gICAgLmF0dHIoJ3N0cm9rZScsICcjMDAwJylcbiAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgMS41KVxuICAgIC5zZWxlY3RBbGwoJ2xpbmUnKS5kYXRhKGRMaW5rcylcbiAgICAuZW50ZXIoKVxuICAgIC5hcHBlbmQoJ2xpbmUnKVxuXG4gIG5vZGVzID0gYmFzZS5hcHBlbmQoJ2cnKVxuICAgIC5zZWxlY3RBbGwoJ3VzZScpLmRhdGEoZE5vZGVzKS5lbnRlcigpXG4gICAgLmFwcGVuZCgndXNlJylcbiAgICAuYXR0cignaHJlZicsIGQgPT4gYCMke2QuY29kZX1gKVxuICAgIC5hdHRyKCdjbGFzcycsIGQgPT4gYGZsYWcgZmxhZy0ke2QuY29kZX1gKVxuICAgIC5vbignbW91c2VvdmVyJywgb3ZlcilcbiAgICAub24oJ21vdXNlb3V0Jywgb3V0KVxuICAgIC5jYWxsKGQzLmRyYWcoKVxuICAgICAgLm9uKCdzdGFydCcsIGRyYWdzdGFydGVkKVxuICAgICAgLm9uKCdkcmFnJywgZHJhZ2dlZClcbiAgICAgIC5vbignZW5kJywgZHJhZ2VuZGVkKSlcblxuICBsYWJlbHMgPSBiYXNlLmFwcGVuZCgnZycpXG4gICAgLmF0dHIoJ2NsYXNzJywgJ2xhYmVscycpXG4gICAgLmF0dHIoJ3N0cm9rZScsICdyZWQnKVxuICAgIC5zdHlsZSgnZm9udC1zaXplJywgJzIwcHgnKVxuICAgIC5zZWxlY3RBbGwoJ3RleHQnKS5kYXRhKGROb2RlcykuZW50ZXIoKVxuICAgIC5hcHBlbmQoJ3RleHQnKVxuICAgIC5hdHRyKCdpZCcsIGQgPT4gYGNvZGVfJHtkLmNvZGV9YClcbiAgICAuYXR0cignZGlzcGxheScsICdub25lJylcbiAgICAudGV4dChkID0+IGQuY291bnRyeSlcbn0pXG5cbiJdfQ==
