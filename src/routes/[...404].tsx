import { Title } from '@solidjs/meta';
import type { RouteDefinition } from '@solidjs/router';
import { httpStatus } from '@solidjs/web';

export const route = {
  preload: () => httpStatus(404),
} satisfies RouteDefinition;

export default function NotFound() {
  return (
    <main>
      <Title>404 | SlotFlow</Title>
      <div class="centerContent" style={{
        "font-size": "45px",
        margin: "0"
      }}>
        <h1>404</h1>
        <h1>Page Introuvable</h1>
      </div>
      
    </main>
  );
}
