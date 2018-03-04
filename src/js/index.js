const n = document.getElementsByTagName('body')[0]
const width = n.clientWidth - 4, height = n.clientHeight - 4
const data = require('./data')
const alpha = 1.9
const scale = .03

data.do((dNodes, dLinks) => {
  let svg, base, links, nodes, labels, sim

  let ticked = () => {
    nodes
      .attr('transform', d => `translate(${d.x - 8},${d.y - 6}) scale(${scale})`)

    labels
      .attr('x', function (d) { return d.x })
      .attr('y', function (d) { return d.y - 12 })

    links
      .attr('x1', function (d) { return d.source.x })
      .attr('y1', function (d) { return d.source.y })
      .attr('x2', function (d) { return d.target.x })
      .attr('y2', function (d) { return d.target.y })
  }

  sim = d3.forceSimulation(dNodes)
    .force('link', d3.forceLink(dLinks).distance(60))
    .force('charge', d3.forceManyBody().strength(-100).distanceMax(500))
    .force('collide', d3.forceCollide().radius(12).strength(12))

    .force('x', d3.forceX().strength(.05))
    .force('y', d3.forceY().strength(.1))

    .on('tick', ticked)

  let dragstarted = (d) => {
    if (!d3.event.active) {
      sim.alphaTarget(alpha).restart()
    }
    d.fx = d.x
    d.fy = d.y
  }

  let dragged = (d) => {
    d.fx = d3.event.x
    d.fy = d3.event.y
  }

  let dragended = (d) =>  {
    if (!d3.event.active)  {
      sim.alphaTarget(alpha)
    }
    d.fx = null
    d.fy = null
  }

  function over (d) {
    d3.select(`#code_${d.code}`)
      .attr('display', null)
  }

  function out (d) {
    d3.select(`#code_${d.code}`)
      .attr('display', 'none')
  }

  svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('text-anchor', 'middle')
    .style('font-family', 'sans-serif')

  svg.append('text')
    .attr('transform', `translate(${width/2},${height/10})`)
    .attr('font-size', 34)
    .attr('font-weight', 'bold')
    .text('National Contiguity with a Force Directed Graph')

  base = svg.append('g')
    .attr('transform', `translate(${width/2},${height/2})`)

  links = base.append('g')
    .attr('stroke', '#000')
    .attr('stroke-width', 1.5)
    .selectAll('line').data(dLinks)
    .enter()
    .append('line')

  nodes = base.append('g')
    .selectAll('use').data(dNodes).enter()
    .append('use')
    .attr('href', d => `#${d.code}`)
    .attr('class', d => `flag flag-${d.code}`)
    .on('mouseover', over)
    .on('mouseout', out)
    .call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended))

  labels = base.append('g')
    .attr('class', 'labels')
    .attr('stroke', 'red')
    .style('font-size', '20px')
    .selectAll('text').data(dNodes).enter()
    .append('text')
    .attr('id', d => `code_${d.code}`)
    .attr('display', 'none')
    .text(d => d.country)
})

