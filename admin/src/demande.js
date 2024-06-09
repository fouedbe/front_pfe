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
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvODg5Y2RiZWUtZDg4MS00MmRjLWJkMDYtYWQzMjM3YzM0YTUzLyIsImlhdCI6MTcxNzY3NTY1NSwibmJmIjoxNzE3Njc1NjU1LCJleHAiOjE3MTc2Nzk2MTEsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84V0FBQUFTK1JqSENYR3dvZ2VURDVKVWxQQzRJdG9ScjNraDVDT2FFVUZaaHg3ZGJBMHFUSEt4V1UySGdSL1liMnNKZ0xKIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjE4ZmJjYTE2LTIyMjQtNDVmNi04NWIwLWY3YmYyYjM5YjNmMyIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiQmVuUmphYiIsImdpdmVuX25hbWUiOiJGb3VlZCIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjE5Ni4yMjQuODIuMTU4IiwibmFtZSI6IkZvdWVkIEJlblJqYWIiLCJvaWQiOiI3NmViYmMyNy0xNDI3LTRhODYtYmUwYS03YWEzN2RhN2Q0ZjUiLCJwdWlkIjoiMTAwMzIwMDE3QUZERTk3RSIsInJoIjoiMC5BVjBBN3R1Y2lJSFkzRUs5QnEweU44TktVd2tBQUFBQUFBQUF3QUFBQUFBQUFBQmRBSkUuIiwic2NwIjoiQXBwLlJlYWQuQWxsIENhcGFjaXR5LlJlYWQuQWxsIENhcGFjaXR5LlJlYWRXcml0ZS5BbGwgQ29udGVudC5DcmVhdGUgRGFzaGJvYXJkLlJlYWQuQWxsIERhc2hib2FyZC5SZWFkV3JpdGUuQWxsIERhdGFmbG93LlJlYWQuQWxsIERhdGFmbG93LlJlYWRXcml0ZS5BbGwgRGF0YXNldC5SZWFkLkFsbCBEYXRhc2V0LlJlYWRXcml0ZS5BbGwgR2F0ZXdheS5SZWFkLkFsbCBHYXRld2F5LlJlYWRXcml0ZS5BbGwgSXRlbS5FeGVjdXRlLkFsbCBJdGVtLlJlYWRXcml0ZS5BbGwgSXRlbS5SZXNoYXJlLkFsbCBPbmVMYWtlLlJlYWQuQWxsIE9uZUxha2UuUmVhZFdyaXRlLkFsbCBQaXBlbGluZS5EZXBsb3kgUGlwZWxpbmUuUmVhZC5BbGwgUGlwZWxpbmUuUmVhZFdyaXRlLkFsbCBSZXBvcnQuUmVhZFdyaXRlLkFsbCBSZXBydC5SZWFkLkFsbCBTdG9yYWdlQWNjb3VudC5SZWFkLkFsbCBTdG9yYWdlQWNjb3VudC5SZWFkV3JpdGUuQWxsIFRlbmFudC5SZWFkLkFsbCBUZW5hbnQuUmVhZFdyaXRlLkFsbCBVc2VyU3RhdGUuUmVhZFdyaXRlLkFsbCBXb3Jrc3BhY2UuR2l0Q29tbWl0LkFsbCBXb3Jrc3BhY2UuR2l0VXBkYXRlLkFsbCBXb3Jrc3BhY2UuUmVhZC5BbGwgV29ya3NwYWNlLlJlYWRXcml0ZS5BbGwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJfeVFhNkhTalV3UDdJenVILVp3TkotdlQ5Yjg1V1hSc2RCc0ZsdTFqRFNzIiwidGlkIjoiODg5Y2RiZWUtZDg4MS00MmRjLWJkMDYtYWQzMjM3YzM0YTUzIiwidW5pcXVlX25hbWUiOiJmb3VlZC5iZW5yZWplYkB0ZWstdXAuZGUiLCJ1cG4iOiJmb3VlZC5iZW5yZWplYkB0ZWstdXAuZGUiLCJ1dGkiOiI1UVBtVG51a2dFNmZzbmN4alpKdUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.ictem6HmEJTcHK-plLiFrgckFOsUQZ21js76eBUmDRVCjU1tmOOvLY33qco-wezT-cJmUyxmELxFO58yM44eaMg5RoNeurmK4dgb1AIe2Ghqh6FESXn5H0WkNKxvEtEY5Es4bxXrVsRAZkKyLtrj25tSXc6VwKBBEyFEKeuHE7yb4EvF_vUtRvCaOXKrZcNjyFrojiSVbmiaN7WBEyLMubAVCI9-lfgKiqgzY9TTwVNizaosxJpMp9-MsezURZzn0iv-5IeywshOwcIffcSlhfZNZswwG8E9nGVY9A_uGxohhyXpl7hWXZdaBx9SNjXA9Sxlt87zdaNdiVRBn7wEiw',
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
