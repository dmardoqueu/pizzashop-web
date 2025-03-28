import { test, expect } from '@playwright/test';

test('sign up successfuly', async ({ page }) => {
    await page.goto('/sign-up', { waitUntil: 'networkidle' })

    await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop')
    await page.getByLabel('Seu nome').fill('John Doe')
    await page.getByLabel('Seu telefone').fill('06589685956')
    await page.getByLabel('Seu e-mail').fill('johndoe@example.com')

    await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

    const toast = page.getByText(
        'Restaurante cadastrado com sucesso!'
    )

    await expect(toast).toBeVisible()
});

test('sign up with error', async ({ page }) => {
    await page.goto('/sign-up', { waitUntil: 'networkidle' })

    await page.getByLabel('Nome do estabelecimento').fill('Invalid name')
    await page.getByLabel('Seu nome').fill('John Doe')
    await page.getByLabel('Seu telefone').fill('06589685956')
    await page.getByLabel('Seu e-mail').fill('johndoe@example.com')

    await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

    const toast = page.getByText(
        'Erro ao cadastrar restaurante.'
    )

    await expect(toast).toBeVisible()
});

test('navigate to new login', async ({ page }) => {
    await page.goto('/sign-up', { waitUntil: 'networkidle' })

    await page.getByRole('link', { name: 'Fazer login' }).click()

    expect(page.url()).toContain('/sign-in')
});
