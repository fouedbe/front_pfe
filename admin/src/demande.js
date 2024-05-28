import './demande.css';
import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation du fichier CSS de Bootstrap
import axios from "axios";
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
function Demande() {
    
    
    
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);

    return (
        <div className="dem">
         
      <header className="App-header">
        
        <PowerBIEmbed
          embedConfig={{
            type: 'report',   // Supported types: report, dashboard, tile, visual and qna
            id: '19ce7cec-8c76-4143-9866-f10df1ba5e89',
            embedUrl: "https://app.powerbi.com/reportEmbed?reportId=19ce7cec-8c76-4143-9866-f10df1ba5e89&groupId=e076c288-b55c-4b13-b89c-4288a8d3caff&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUFGUklDQS1OT1JUSC1BLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7InVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d",
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvODg5Y2RiZWUtZDg4MS00MmRjLWJkMDYtYWQzMjM3YzM0YTUzLyIsImlhdCI6MTcxNjU3MDE1MCwibmJmIjoxNzE2NTcwMTUwLCJleHAiOjE3MTY1NzQxMzIsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84V0FBQUFWRGl3TDFCRDVvOElvZVRzY21xSlkxdzFlYmF6Z1h1cy83NmowK1M2VWtCMkRqNm55cVhoa3RrbkJtMXVKZktDIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiQmVuUmphYiIsImdpdmVuX25hbWUiOiJGb3VlZCIsImlwYWRkciI6IjE5Ny4yOS4yMzYuMjM4IiwibmFtZSI6IkZvdWVkIEJlblJqYWIiLCJvaWQiOiI3NmViYmMyNy0xNDI3LTRhODYtYmUwYS03YWEzN2RhN2Q0ZjUiLCJwdWlkIjoiMTAwMzIwMDE3QUZERTk3RSIsInJoIjoiMC5BVjBBN3R1Y2lJSFkzRUs5QnEweU44TktVd2tBQUFBQUFBQUF3QUFBQUFBQUFBQmRBSkUuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiX3lRYTZIU2pVd1A3SXp1SC1ad05KLXZUOWI4NVdYUnNkQnNGbHUxakRTcyIsInRpZCI6Ijg4OWNkYmVlLWQ4ODEtNDJkYy1iZDA2LWFkMzIzN2MzNGE1MyIsInVuaXF1ZV9uYW1lIjoiZm91ZWQuYmVucmVqZWJAdGVrLXVwLmRlIiwidXBuIjoiZm91ZWQuYmVucmVqZWJAdGVrLXVwLmRlIiwidXRpIjoiaWRieUVGRE5ja1NrODYzZk82MVdBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.F74ebh2SMd4_-eZOV0bxNaxBbwtMfeD_F90hzQkkbp-GZd9shO8l_24zx6yDJ94BY1GhmyfYZtUnK4DBHxNBQ2YkKMRFw7DJ1TyHRrWd28AC-a0hBfrgMsNAgUKvD7163klbEm-79CoGIElQlfcecEZnPiWgu63xa8RpJZoRgkjrjQ-ZlmC701NJNQJrhe5QVrkE7OnjwWapyExWGaSga7fscLjgP9yo8jKl8KAGkvLvsEz3eK8W4f72YqI-2JXC3PIm9MD_bCkjfmmP7VBdc2HoUOlXywzFdhRoGZg36slhCwDPvDK952dCBKJlDzeZNEmPo70kdyGN23TcbT_oiQ',
            tokenType: models.TokenType.Aad,
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: true
                }
              },
            }
          }}

          eventHandlers={
            new Map([
              ['loaded', function () { console.log('Report loaded'); }],
              ['rendered', function () { console.log('Report rendered'); }],
              ['error', function (event) { console.log(event.detail); }]
            ])
          }

          cssClassName={"Embed-container"}

          getEmbeddedComponent={(embeddedReport) => {
            window.report = embeddedReport;
          }}
        />
      </header>
   
        </div>
    );
}

export default Demande;
