# Version Management Guide

This project uses **Semantic Versioning** (SemVer): `MAJOR.MINOR.PATCH`

## Version Format

- **MAJOR**: Breaking changes (1.0.0)
- **MINOR**: New features, backward compatible (0.2.0)
- **PATCH**: Bug fixes, backward compatible (0.1.1)

## How to Release a New Version

### 1. Update Version Numbers

Update version in these files:
- `package.json`
- `app.json`
- `VERSION`
- `CHANGELOG.md`

### 2. Create Git Tag (After Setting Up Remote)

```bash
# First, commit your changes
git add .
git commit -m "Release v0.1.0"

# Create an annotated tag
git tag -a v0.1.0 -m "Initial release with 20+ UI components"

# Push to remote with tags
git push origin main --tags
```

### 3. Version Bump Commands

For convenience, add these scripts to `package.json`:

```json
"scripts": {
  "version:patch": "npm version patch",
  "version:minor": "npm version minor",
  "version:major": "npm version major"
}
```

### 4. Release Checklist

Before each release:
- [ ] Update CHANGELOG.md
- [ ] Run tests (when available)
- [ ] Update documentation
- [ ] Create git tag
- [ ] Push tag to remote
- [ ] Create GitHub release

### 5. Version History

| Version | Date | Description |
|---------|------|-------------|
| 0.1.0 | 2025-09-22 | Initial release |

### 6. After Creating Remote Repository

```bash
# Initialize git (if not already done)
git init

# Add remote repository
git remote add origin https://github.com/chvvkrishnakumar/expo-nativewind-template.git

# Create initial commit
git add .
git commit -m "Initial commit: Expo NativeWind Template v0.1.0"

# Create and push tag
git tag -a v0.1.0 -m "Initial release"
git push -u origin main
git push origin v0.1.0
```

### 7. GitHub Release

After pushing the tag, create a release on GitHub:
1. Go to Releases → Create new release
2. Choose tag `v0.1.0`
3. Add release notes from CHANGELOG.md
4. Mark as pre-release if needed
5. Publish release