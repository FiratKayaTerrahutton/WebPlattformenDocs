import { useState, useEffect } from 'react'

const FeedbackPage = () => {
  const [completedItems, setCompletedItems] = useState(new Set())
  const [isInitialized, setIsInitialized] = useState(false)



  // Load from localStorage and initialize pre-checked items
  useEffect(() => {
    const loadCompletedItems = () => {
      try {
        const savedItems = localStorage.getItem('feedbackCompletedItems')
        let initialItems = new Set()
        
        if (savedItems) {
          const items = JSON.parse(savedItems)
          initialItems = new Set(items)
          console.log('Loaded completed items from localStorage:', items)
        } else {
          console.log('No existing feedback data found, starting fresh')
        }
        
        // Add pre-checked items from the feedbackItems array
        const preCheckedItems = new Set()
        feedbackItems.forEach(item => {
          if (item.preChecked) {
            preCheckedItems.add(item.id)
          }
        })
        
        // Merge localStorage items with pre-checked items
        const mergedItems = new Set([...initialItems, ...preCheckedItems])
        setCompletedItems(mergedItems)
        
        // Save the merged items back to localStorage if we added pre-checked items
        if (mergedItems.size > initialItems.size) {
          localStorage.setItem('feedbackCompletedItems', JSON.stringify([...mergedItems]))
          localStorage.setItem('feedbackLastUpdated', new Date().toISOString())
          console.log('Added pre-checked items and saved to localStorage')
        }
        
        setIsInitialized(true)
      } catch (error) {
        console.log('Error loading from localStorage, starting fresh')
        setIsInitialized(true)
      }
    }
    
    loadCompletedItems()
  }, [])

  const saveCompletedItems = async (items) => {
    try {
      const data = {
        completedItems: [...items],
        lastUpdated: new Date().toISOString()
      }
      
      console.log('Saving feedback data:', data)
      
      // Save to localStorage as primary method
      localStorage.setItem('feedbackCompletedItems', JSON.stringify([...items]))
      localStorage.setItem('feedbackLastUpdated', data.lastUpdated)
      
      console.log('Successfully saved to localStorage')
      
    } catch (error) {
      console.error('Error saving feedback data:', error)
    }
  }

  const toggleItem = (itemId) => {
    const newCompletedItems = new Set(completedItems)
    if (newCompletedItems.has(itemId)) {
      newCompletedItems.delete(itemId)
    } else {
      newCompletedItems.add(itemId)
    }
    setCompletedItems(newCompletedItems)
    
    // Save to localStorage
    saveCompletedItems(newCompletedItems)
  }

  const copyJsonToClipboard = () => {
    const data = {
      completedItems: [...completedItems],
      lastUpdated: new Date().toISOString()
    }
    
    const jsonString = JSON.stringify(data, null, 2)
    
    navigator.clipboard.writeText(jsonString).then(() => {
      console.log('JSON copied to clipboard')
      alert('JSON data copied to clipboard!')
    }).catch(err => {
      console.error('Failed to copy JSON:', err)
      alert('Failed to copy JSON to clipboard')
    })
  }

  const feedbackItems = [
    {
      id: 'labels-render',
      title: 'Labels måste renderas över marken, och inte opacity. FATTAR EJ ❌',
      preChecked: false
    },
    {
      id: 'camera-auto-rotate',
      title: 'När kameran auto roterar kan man flytta sig med left mouse click samtidigt som den snurrar. ON CAMERA ENTER ISTÄLLET FÖR ON CAMERA EXIT ❌',
      preChecked: false
    },
    {
      id: 'compass-rotation',
      title: 'Kompass N bokstav borde alltid vara roterad uppåt FIXAT ✅',
      preChecked: true
    },
    {
      id: 'measurement-texture',
      title: 'Mätverktyg texturen "rör" sig när kameran roterar SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'top-menu-buttons',
      title: 'Fixa knapparna i toppmenyn så det ligger snyggare SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'top-menu-close',
      title: 'Tror det är bra om vi inte stänger toppmenyn när vi klickar utanför FIXAT ✅',
      preChecked: true
    },
    {
      id: 'auto-rotate-easing',
      title: 'Borde vara en easing in time på auto rotate och gör den lite långsammare SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'font-issue',
      title: 'Fonten ser inte helt korrekt ut? SKA UNDERSÖKAS ❌',
      preChecked: false
    },
    {
      id: 'surface-samples',
      title: 'Surface Samples ser bra ut TACK ✅',
      preChecked: true
    },
    {
      id: 'satellite-imagery',
      title: 'Satellite Imagery Vissa decals ser inte bra ut, ser ut som det är kompressade. Vi vill kunna ha flera Satellite Imagery på samtidigt SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'geophysics-3d',
      title: 'Geophysics 3D geophysics fungerar inte, kolla över resistivitet ser inte så bra ut SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'point-of-interest',
      title: 'Point of Interest kolla över targets, middle miocene belt animeras/fungerar inte. Border, market cap och tentement Outline ser bra ut! SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'drilling',
      title: 'Drilling så drill holes fungerar SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'drawing-tool',
      title: 'Ritverktyget ska fungera på samma vis som mätverktyget. Alltså i 3d space SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'compass-click',
      title: 'När man klickar på kompassen när man auto rotera så flyttas man iväg SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'boundary-limits',
      title: 'Sätt upp så användare inte får gå utanför området SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'mogotes-overview',
      title: 'Mogotes overview ser bra ut TACK ✅',
      preChecked: true
    },
    {
      id: 'underground-overview',
      title: 'Underground Overview transition från mogotes overview ser lite konstig ut. Här vill vi också sätta på geofysik när det är inne SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'san-juan-overview',
      title: 'San Juan overview Transition från underground ser också lite konstig ut, Kameran ska inte vara roterad på z här SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'berlin-remove',
      title: 'Berlin ta bort SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'bhp-market-cap',
      title: 'BHP Market Cap kolla över denna SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'mogotes-market-cap',
      title: 'Mogotes Market Cap kolla över SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'ngex',
      title: 'NGEX kolla över SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'au-ppm-legend',
      title: 'Vi vill inte ha Au ppm legend på hela tiden SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'clouds',
      title: 'Kolla om vi kan få in lite moln kanske? SKA UNDERSÖKAS ❌',
      preChecked: false
    },
    {
      id: 'selection-tool',
      title: 'Ta bort selection tool när vi inte har inne geophysik SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'search-symbol',
      title: 'Ta bort sök symbolen uppe i höger, vi vill inte att användare ska använda denna SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'quit-button-name',
      title: 'Byt namn på Quit till Save and Close eller något liknande som låter bra SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'localstorage-settings',
      title: 'Vi borde spara settings till localstorage så användaren har samma inställningar när det kommer tillbaka SKA UNDERSÖKAS ❌',
      preChecked: false
    },
    {
      id: 'texture-quality-inverted',
      title: 'Texture quality borde vara inverterad SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'camera-point-3-bug',
      title: 'Bug på kamera punkt 3 first person SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'iframe-test',
      title: 'Testa in detta som en iframe på någon sida, hojta till om du behöver betala något SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'custom-controls',
      title: 'Robin tycker inte om kontrollerna, gör så användaren kan ändra i inställningar SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'light-colors-clipping',
      title: 'Ljusa färger på decals klipps bort, kolla över SKA UNDERSÖKAS ❌',
      preChecked: false
    },
    {
      id: 'mogotes-app-cleanup',
      title: 'Super viktigt! Vi får inte ha något i mogotes appen som inte tillhör mogotes, kan bli stora problem (Typ abra silver drill holes som ligger kvar) SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'momentum-persistence',
      title: 'Momentum ligger kvar när man släpper rotation SKA UNDERSÖKAS ❌',
      preChecked: false
    },
    {
      id: 'data-security',
      title: 'Alla json-filer/data filer du har inne i projektet kan alla se just nu, det får absolut inte visas för användare som det gör just nu, kolla under network tab så ser du vad användaren kan få för data SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'skybox-rotation',
      title: 'Skyboxen är roterad SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'skybox-toggle-bug',
      title: 'Om man stänger av skybox och sen ändrar på skybox image shift så sätter den på sig själv igen SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'fog-color',
      title: 'Fog color borde utgå från skybox color SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'decals-order',
      title: 'Ordningen på decals. Vilken visas överst? SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'mobile-warning',
      title: 'Om den inte går att ladda/crashar, visa en varning istället, iPad/telefon SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'simplify-app',
      title: 'Eller simplifiera appen ännu mer, ta bort surface samples osv SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'underground-color',
      title: 'Underground ska vara annan färg SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'iframe-fullscreen',
      title: 'Kolla så iframe fungerar, och snygga till den så man kan ha fullscreen features osv FIXAT ✅',
      preChecked: true
    },
    {
      id: 'drillholes-functionality',
      title: 'Drillholes måste fungera SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'geophysics-display',
      title: 'Geofysiken måste kunna visas, men inte med sliders eftersom hela objektet är för stort för att ha online SKA FIXAS ❌',
      preChecked: false
    },
    {
      id: 'legend-functionality',
      title: 'Legenden måste fungera på drillholes, geofysik, surface samples SKA FIXAS ❌',
      preChecked: false
    }
  ]

  // Don't render until initialized
  if (!isInitialized) {
    return <div style={{ padding: '20px', color: 'white' }}>Loading...</div>
  }

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      color: 'white'
    }}>
      <h1 style={{
        fontSize: '2.5em',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center',
        color: 'white'
      }}>
        WILIAM FEEDBACK RUNDA
      </h1>
      
      <p style={{
        textAlign: 'center',
        marginBottom: '40px',
        fontSize: '16px',
        opacity: 0.9
      }}>
        <strong>Totalt: {feedbackItems.length} punkter | Slutförda: {completedItems.size} | Kvar: {feedbackItems.length - completedItems.size}</strong>
      </p>

      {/* Viktigaste att kolla nu är section */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{
          fontSize: '1.5em',
          fontWeight: 'bold',
          marginBottom: '15px',
          color: 'white'
        }}>
          Viktigaste att kolla nu är
        </h2>
        {feedbackItems.slice(-4).map(item => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              padding: '12px 0',
              borderBottom: '1px solid #333',
              transition: 'all 0.3s ease'
            }}
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                border: '2px solid #444',
                backgroundColor: 'transparent',
                marginRight: '12px',
                marginTop: '2px',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => toggleItem(item.id)}
            >
              {completedItems.has(item.id) && (
                <div style={{
                  color: '#ff6b35',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}>
                  ✓
                </div>
              )}
            </div>
            <span style={{
              fontSize: '16px',
              lineHeight: '1.4',
              flex: 1,
              textDecoration: completedItems.has(item.id) ? 'line-through' : 'none',
              opacity: completedItems.has(item.id) ? 0.6 : 1,
              transition: 'all 0.3s ease'
            }}>
              {item.title}
            </span>
          </div>
        ))}
      </div>

      {/* All other items */}
      {feedbackItems.slice(0, -4).map(item => (
        <div
          key={item.id}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            padding: '12px 0',
            borderBottom: '1px solid #333',
            transition: 'all 0.3s ease'
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              border: '2px solid #444',
              backgroundColor: 'transparent',
              marginRight: '12px',
              marginTop: '2px',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => toggleItem(item.id)}
          >
            {completedItems.has(item.id) && (
              <div style={{
                color: '#ff6b35',
                fontSize: '20px',
                fontWeight: 'bold'
              }}>
                ✓
              </div>
            )}
          </div>
          <span style={{
            fontSize: '16px',
            lineHeight: '1.4',
            flex: 1,
            textDecoration: completedItems.has(item.id) ? 'line-through' : 'none',
            opacity: completedItems.has(item.id) ? 0.6 : 1,
            transition: 'all 0.3s ease'
          }}>
            {item.title}
          </span>
        </div>
      ))}

      <div style={{
        textAlign: 'center',
        marginTop: '40px',
        padding: '20px',
        borderTop: '2px solid #444'
      }}>
        <p style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#ff6b35'
        }}>
          Progress: {Math.round((completedItems.size / feedbackItems.length) * 100)}%
        </p>
        
        <div style={{
          marginTop: '20px'
        }}>
          <button
            onClick={copyJsonToClipboard}
            style={{
              backgroundColor: '#ff6b35',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#e55a2b'
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#ff6b35'
            }}
          >
            📋 Kopiera JSON till klippbordet
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeedbackPage 