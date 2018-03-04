let res = (() => {
  let url = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json'
  
  return {
    do: (f) => {
      d3.json(url, (error, res) => {
        if (error) {
          throw error
        }
        else {
          d3.xml('img/svg/symbols.svg')
            .mimeType('image/svg+xml')
            .get(function(error, xml) {
              if (error) {
                throw error
              }
              document.body.appendChild(xml.documentElement)
              f(res.nodes, res.links)
            })
        }
      })
      
    },
  }
})()

module.exports = res
